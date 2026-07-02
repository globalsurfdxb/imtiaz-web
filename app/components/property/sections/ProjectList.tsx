"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useContainerInset } from "@/app/hooks/useContainerInset";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { useLenis } from "@/app/contexts/LenisContext";
import ProjectCard from "../../common/ProjectCard";
import Reveal from "../../animations/RevealOneByOneAnimation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import PropertyCard from "./PropertyCard";
import SliderArrowButton from "../../common/SliderNavigationButton";
import { PropertyListingItem } from "../data";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

type ProjectWithId = PropertyListingItem & {
  id: string;
};

const EmptyState = () => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="mb-10 lg:mb-0"
  >
    <motion.p
      initial="hidden"
      whileInView="show"
      variants={moveUp(0)}
      viewport={{ once: true }}
      className="text-2xl"
    >
      No results in this area
    </motion.p>
    <motion.p
      variants={moveUp(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      Try zooming out, moving the map, or changing your filters.
    </motion.p>
  </motion.div>
);

export default function FeaturedProjects({
  projects,
}: {
  projects: ProjectWithId[];
}) {
  const [activeProject, setActiveProject] = useState<string>("");
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const markerRefs = useRef<Record<string, google.maps.marker.AdvancedMarkerElement>>({});
  const clustererRef = useRef<MarkerClusterer | null>(null);

  const [zoom, setZoom] = useState(15);

  const BASE_SIZE = 49;
  const activeSize = zoom >= 15
    ? BASE_SIZE
    : Math.max(20, BASE_SIZE * (zoom / 15) * 0.9);
  const innerSize = activeSize * 0.61;

  useEffect(() => {
    setVisibleProjects([]);
    setHighlighted([]);
    setActiveProject("0"); // ← index 0, not projects[0]?.id
  }, [projects]);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const containerRef = useRef(null);
  const leftSpacing = useContainerInset(containerRef);

  const [visibleProjects, setVisibleProjects] = useState<ProjectWithId[]>([]);

  const [highlighted, setHighlighted] = useState<string[]>([]);
  const map = useMap();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { lock, unlock, scrollTo } = useLenis();

  // Create the clusterer once the map instance is available
  useEffect(() => {
    if (!map) return;
    clustererRef.current = new MarkerClusterer({
      map,
      renderer: {
        render({ count, position }) {
          const div = document.createElement("div");
          div.innerHTML = `
            <div style="
              background: #490905;
              color: white;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
              border: 2px solid white;
            ">${count}</div>
          `;
          return new google.maps.marker.AdvancedMarkerElement({
            position,
            content: div.firstElementChild as HTMLElement,
          });
        },
      },
    });

    return () => {
      clustererRef.current?.clearMarkers();
      clustererRef.current = null;
    };
  }, [map]);

  // Re-sync clusterer markers whenever the set of rendered markers could have changed.
  // Deferred with setTimeout(0) so all AdvancedMarker ref callbacks (and any internal
  // async marker creation from @vis.gl/react-google-maps) have settled before we read
  // markerRefs.current — this is what fixes "works after pan/zoom, not on first load".
  useEffect(() => {
    if (!map || !clustererRef.current) return;

    const timeout = setTimeout(() => {
      clustererRef.current?.clearMarkers();
      clustererRef.current?.addMarkers(Object.values(markerRefs.current));
    }, 0);

    return () => clearTimeout(timeout);
  }, [map, highlighted, activeProject]);

  const handleCameraChanged = (event: MapCameraChangedEvent) => {
    const { bounds } = event.detail || {};
    if (!bounds) return;

    const visibleProjectsInBounds = projects.filter(
      (p) =>
        parseFloat(p.property_latitude) >= bounds.south &&
        parseFloat(p.property_latitude) <= bounds.north &&
        parseFloat(p.property_longitude) >= bounds.west &&
        parseFloat(p.property_longitude) <= bounds.east,
    );

    // Store indices instead of ids
    const visibleIndices = visibleProjectsInBounds.map((p) =>
      projects.indexOf(p).toString()
    );

    setVisibleProjects(visibleProjectsInBounds);
    setHighlighted(visibleIndices); // ← indices now

    if (visibleProjectsInBounds.length > 0) {
      if (!visibleIndices.includes(activeProject)) {
        setActiveProject(projects.indexOf(visibleProjectsInBounds[0]).toString());
      }
    } else {
      setActiveProject("");
    }
  };

  // Apply grayscale styles via setOptions (works with mapId)
  useEffect(() => {
    if (!map) return;
    (map as any).setOptions({
      styles: [
        { elementType: "geometry", stylers: [{ saturation: -100 }] },
        { elementType: "labels.icon", stylers: [{ saturation: -100 }] },
        { elementType: "labels.text.fill", stylers: [{ saturation: -100 }] },
        { elementType: "labels.text.stroke", stylers: [{ saturation: -100 }] },
        { featureType: "road", elementType: "geometry", stylers: [{ saturation: -100 }] },
        { featureType: "water", elementType: "geometry", stylers: [{ saturation: -100 }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ saturation: -100 }] },
      ],
    });
  }, [map]);

  // Initial center/zoom + force a bounds calculation on first idle so
  // highlighted/visibleProjects (and therefore markers + clustering) populate
  // without requiring the user to pan/zoom first.
  useEffect(() => {
    if (!map || projects.length === 0) return;

    const firstProject = projects[0];
    const newCenter = {
      lat: parseFloat(firstProject.property_latitude),
      lng: parseFloat(firstProject.property_longitude),
    };

    const currentCenter = map.getCenter();
    if (
      !currentCenter ||
      currentCenter.lat() !== newCenter.lat ||
      currentCenter.lng() !== newCenter.lng
    ) {
      map.panTo(newCenter);
    }

    if (map.getZoom() !== 11) {
      map.setZoom(11);
    }

    const idleListener = map.addListener("idle", () => {
      const bounds = map.getBounds();
      if (bounds) {
        handleCameraChanged({ detail: { bounds: bounds.toJSON() } } as MapCameraChangedEvent);
      }
      google.maps.event.removeListener(idleListener);
    });

    return () => google.maps.event.removeListener(idleListener);
  }, [map, projects]);

  const handleEnter = () => {
    if (window.innerWidth >= 1280) lock();
  };
  const handleLeave = () => {
    if (window.innerWidth >= 1280) unlock();
  };
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      unlock();
    };
  }, [lock, unlock]);

  return (
    <section className={`mx-auto `}>
      {/* <ContainerAnchor ref={containerRef} /> */}
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col-reverse xl:grid xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-[749px_1fr] gap-[30px] md:gap-20"
        >
          {/* Left Column */}
          <div className="overflow-hidden">
            {/* Projects List */}
            <div className="relative grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-20 gap-x-20 hidden   2xl:hidden">
              {visibleProjects.length > 0 ? (
                visibleProjects?.map((project, index) => (
                  <Reveal
                    variants={moveUpV2}
                    key={index}
                    delayRange={index * 0.11}
                  >
                    <ProjectCard
                      image={project.featured_image_desktop}
                      mobileImage={project.featured_image_mobile}
                      hoverImage={project.brand_logo}
                      subtitle={project.property_caption}
                      status={project.property_status}
                      location={project.property_location}
                      startingFrom={project.icon1_text}
                      units={project.icon2_text}
                      {...project} />
                  </Reveal>
                ))
              ) : (
                <EmptyState />
              )}
            </div>

            {visibleProjects.length > 0 ? (
              <>
                {/* ── Mobile: Swiper (< md) ── */}
                <div className="xl:hidden ">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    grabCursor={true}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      768: { slidesPerView: 2 },
                    }}
                    modules={[Autoplay]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="!overflow-visible w-full"
                  >
                    {visibleProjects.map((project, index) => (
                      <SwiperSlide key={index}>
                        <PropertyCard
                          id={index.toString()}
                          image={project.featured_image_desktop}
                          mobileImage={project.featured_image_mobile}
                          status={project.property_status}
                          location={project.property_location}
                          title={project.title}
                          subtitle={""}
                          startingFrom={project.icon1_text}
                          units={project.icon2_text}
                          hoverImage={project.brand_logo}
                          setActiveProject={setActiveProject}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="flex items-center gap-[15px] justify-center mt-5">
                    <SliderArrowButton
                      direction="prev"
                      variant="dark"
                      onClick={() => swiperRef.current?.slidePrev()}
                    />
                    <SliderArrowButton
                      direction="next"
                      variant="dark"
                      onClick={() => swiperRef.current?.slideNext()}
                    />
                  </div>
                </div>

                {/* ── md+: original grid ── */}
                <div className="hidden xl:grid relative grid-cols-1 gap-y-20 2xl:grid">
                  {visibleProjects.map((project, index) => (
                    <Reveal
                      variants={moveUpV2}
                      key={index}
                      delayRange={index * 0.11}
                    >
                      <PropertyCard
                        id={index.toString()}
                        image={project.featured_image_desktop}
                        status={project.property_status}
                        location={project.property_location}
                        title={project.title}
                        subtitle={""}
                        startingFrom={project.icon1_text}
                        units={project.icon2_text}
                        hoverImage={project.brand_logo}
                        setActiveProject={setActiveProject}
                      />
                    </Reveal>
                  ))}
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Right Column Map for Desktop */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="xl:sticky top-[10px] h-[371px] md:h-[70vh] xl:h-[calc(100vh-20px)] z-10"
          >
            {/* Grayscale overlay - affects tiles only, not markers */}
            <div ref={mapContainerRef} className="w-full h-full relative">
              <Map
                defaultCenter={{
                  lat: parseFloat(projects[0]?.property_latitude),
                  lng: parseFloat(projects[0]?.property_longitude),
                }}
                onZoomChanged={(e) => setZoom(e.detail.zoom)}
                mapId="2567b86b459988d06657407f"
                defaultZoom={11}
                className="w-full h-full"
                gestureHandling="cooperative"
                onCameraChanged={handleCameraChanged}
                disableDefaultUI={true}
              >
                {projects?.map((project, index) => {
                  const isActive = activeProject === index.toString();
                  const isHighlighted = highlighted.includes(index.toString());
                  if (!isActive && !isHighlighted) return null;

                  return (
                    <AdvancedMarker
                      key={index}
                      position={{
                        lat: parseFloat(project.property_latitude),
                        lng: parseFloat(project.property_longitude),
                      }}
                      ref={(marker) => {
                        if (marker) {
                          markerRefs.current[index.toString()] = marker;
                        } else {
                          delete markerRefs.current[index.toString()];
                        }
                      }}
                      onClick={() => {
                        setVisibleProjects((prev) => {
                          const newArr = prev.filter((p) => p !== project);
                          return [project, ...newArr];
                        });
                        setActiveProject(index.toString());
                        scrollTo(700, { duration: 1.2 });
                      }}
                    >
                      {isActive ? (
                        <div
                          className="relative flex items-center justify-center"
                          style={{ width: activeSize, height: activeSize }}
                        >
                          <div className="absolute inset-0 rounded-full border border-[#490905] bg-[#490905]/10" />
                          <div
                            className="rounded-full overflow-hidden z-10"
                            style={{ width: innerSize, height: innerSize }}
                          >
                            <img
                              src={project.featured_image_desktop}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="relative flex items-center justify-center"
                          style={{ width: activeSize, height: activeSize }}
                        >
                          <div className="absolute inset-0 rounded-full border border-[#490905] bg-[#490905]/10" />
                          <div
                            className="rounded-full overflow-hidden z-10"
                            style={{ width: innerSize, height: innerSize }}
                          >
                            <img
                              src={project.featured_image_desktop}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </AdvancedMarker>
                  );
                })}
              </Map>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}