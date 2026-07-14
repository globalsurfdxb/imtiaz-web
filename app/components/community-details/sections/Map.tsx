// "use client";
// import Image from "next/image";

// import { Map, Marker, Polygon } from "@vis.gl/react-google-maps";
// import { APIProvider } from "@vis.gl/react-google-maps";

// const MapOriginal = ({pt}: {pt: boolean}) => {

//   const communityCoordinates = [
//   { lat: 25.297627, lng: 55.335884 },
//   { lat: 25.290180, lng: 55.344875 },
//   { lat: 25.284311, lng: 55.338624 },
//   { lat: 25.292540, lng: 55.328108},
// ];

// const properties = [
//   {
//     id: 1,
//     lat: 25.289696,
//     lng: 55.338716,
//   },
// ];

//   return (
//     <section data-header="dark" className={`w-full ${!pt ? "pt-0 " : "pt-[70px] lg:pt-120 3xl:pt-160"} pb-[70px] lg:pb-120 3xl:pb-160`}>
//       <div className="h-[488px] lg:h-[839px] ">
//       <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
//           <Map
//             defaultCenter={{ lat: 25.291063, lng: 55.337229 }}
//             defaultZoom={14}
//             mapId="2567b86b459988d06657407f"
//             className="w-full h-full"
//             disableDefaultUI
//           >
//             {/* COMMUNITY AREA */}
//             <Polygon
//               paths={communityCoordinates}
//               options={{
//                 fillColor: "#C9A14A",
//                 fillOpacity: 0.25,
//                 strokeColor: "#C9A14A",
//                 strokeOpacity: 1,
//                 strokeWeight: 3,
//               }}
//             />

//             {/* PROPERTY MARKERS */}
//             {properties.map((property) => (
//               <Marker
//                 key={property.id}
//                 position={{
//                   lat: property.lat,
//                   lng: property.lng,
//                 }}
//                 icon={{
//                   url: "/active-icon.svg",
//                 }}
//               />
//             ))}
//           </Map>
//         </APIProvider>
//       </div>
//     </section>
//   );
// };

// export default MapOriginal;

// "use client";

// import { APIProvider, Map, Marker, Polygon } from "@vis.gl/react-google-maps";
// import { useState } from "react";

// interface GeofenceCoordinate {
//   latitude: string;
//   longitude: string;
// }

// interface RelatedProperty {
//   slug: string;
//   property_name: string;
//   property_latitude: string;
//   property_longitude: string;
//   property_status: string;
// }

// interface MapOriginalProps {
//   pt: boolean;
//   geofenceCoordinates: GeofenceCoordinate[];
//   relatedProperties: RelatedProperty[];
// }

// const MapOriginal = ({
//   pt,
//   geofenceCoordinates,
//   relatedProperties,
// }: MapOriginalProps) => {
//   // Convert geofence coordinates
//   const communityCoordinates = geofenceCoordinates?.map((coord) => ({
//     lat: Number(coord.latitude),
//     lng: Number(coord.longitude),
//   }));

//   const [zoom, setZoom] = useState(15);

//   const BASE_SIZE = 42;
//   const iconSize = Math.max(
//     18,
//     Math.min(BASE_SIZE, (zoom / 15) * BASE_SIZE)
//   );

//   // Convert property coordinates
//   const properties = relatedProperties?.filter(
//       (property) =>
//         property.property_latitude && property.property_longitude
//     )
//     .map((property, index) => ({
//       id: index + 1,
//       name: property.property_name,
//       lat: Number(property.property_latitude),
//       lng: Number(property.property_longitude),
//       status: property.property_status,
//     }));

//   // Fallback center
//   const defaultCenter =
//     communityCoordinates?.length > 0
//       ? communityCoordinates[0]
//       : { lat: 25.291063, lng: 55.337229 };

//   return (
//     <section
//       data-header="dark"
//       className={`w-full ${!pt
//         ? "pt-0"
//         : "pt-[70px] lg:pt-120 3xl:pt-160"
//         } pb-[70px] lg:pb-120 3xl:pb-160`}
//     >
//       <div className="h-[488px] lg:h-[839px]">
//         <APIProvider
//           apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
//         >
//           <Map
//             defaultCenter={defaultCenter}
//             defaultZoom={16}

//             className="w-full h-full"
//             gestureHandling={"cooperative"}
//             disableDefaultUI={true}
//             onZoomChanged={(e) => setZoom(e.detail.zoom)}
//             styles={[
//               { elementType: "geometry", stylers: [{ saturation: -100 }] },
//               { elementType: "labels.icon", stylers: [{ saturation: -100 }] },
//               {
//                 elementType: "labels.text.fill",
//                 stylers: [{ saturation: -100 }],
//               },
//               {
//                 elementType: "labels.text.stroke",
//                 stylers: [{ saturation: -100 }],
//               },
//               {
//                 featureType: "road",
//                 elementType: "geometry",
//                 stylers: [{ saturation: -100 }],
//               },
//               {
//                 featureType: "water",
//                 elementType: "geometry",
//                 stylers: [{ saturation: -100 }],
//               },
//               {
//                 featureType: "poi",
//                 elementType: "geometry",
//                 stylers: [{ saturation: -100 }],
//               },
//             ]}
//           >
//             {/* COMMUNITY POLYGON */}
//             {communityCoordinates?.length > 0 && (
//               <Polygon
//                 paths={communityCoordinates}
//                 fillColor="#490905"
//                 fillOpacity={0.5}
//                 strokeColor="#171717"
//                 strokeOpacity={1}
//                 strokeWeight={3}
//               />
//             )}

//             {/* PROPERTY MARKERS */}
//             {properties?.map((property) => (
//               <Marker
//                 key={property.id}
//                 position={{
//                   lat: property.lat,
//                   lng: property.lng,
//                 }}
//                 title={property.name}
//                 icon={{
//                   url: "/inactive-icon.svg",
//                   scaledSize: {
//                     width: iconSize,
//                     height: iconSize,
//                     equals: () => false,
//                   } as google.maps.Size,
//                   anchor: {
//                     x: iconSize / 2,
//                     y: iconSize / 2,
//                     equals: () => false,
//                   } as google.maps.Point,
//                 }}
//               />
//             ))}
//           </Map>
//         </APIProvider>
//       </div>
//     </section>
//   );
// };

// export default MapOriginal;

"use client";

import {
  APIProvider,
  AdvancedMarker,
  Map,
  Polygon,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useRef, useState } from "react";

interface GeofenceCoordinate {
  latitude: string;
  longitude: string;
}

interface RelatedProperty {
  slug: string;
  property_name: string;
  property_latitude: string;
  property_longitude: string;
  property_status: string;
  featured_image_desktop: string;
}

interface MapOriginalProps {
  pt: boolean;
  geofenceCoordinates: GeofenceCoordinate[];
  relatedProperties: RelatedProperty[];
}

// Fits the map viewport to contain the polygon + all markers on initial load
const FitBoundsToMarkers = ({
  communityCoordinates,
  properties,
}: {
  communityCoordinates: { lat: number; lng: number }[];
  properties: { lat: number; lng: number }[];
}) => {
  const map = useMap();
  const hasFitRef = useRef(false); // ← only fit once

  useEffect(() => {
    if (!map || hasFitRef.current) return;

    const allPoints = [...communityCoordinates, ...properties];
    if (allPoints.length === 0) return;

    hasFitRef.current = true;

    if (allPoints.length === 1) {
      map.setCenter(allPoints[0]);
      map.setZoom(16);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    allPoints.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds, 60);
  }, [map, communityCoordinates, properties]);

  return null;
};

// Applies grayscale styling via setOptions — required because JSON `styles`
// on <Map> are ignored once a mapId (vector map) is present.
const GrayscaleStyles = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    (map as any).setOptions({
      styles: [
        { elementType: "geometry", stylers: [{ saturation: -100 }] },
        { elementType: "labels.icon", stylers: [{ saturation: -100 }] },
        { elementType: "labels.text.fill", stylers: [{ saturation: -100 }] },
        { elementType: "labels.text.stroke", stylers: [{ saturation: -100 }] },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ saturation: -100 }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ saturation: -100 }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ saturation: -100 }],
        },
      ],
    });
  }, [map]);

  return null;
};

const MapOriginal = ({
  pt,
  geofenceCoordinates,
  relatedProperties,
}: MapOriginalProps) => {
  const communityCoordinates = useMemo(
    () =>
      geofenceCoordinates?.map((coord) => ({
        lat: Number(coord.latitude),
        lng: Number(coord.longitude),
      })) ?? [],
    [geofenceCoordinates],
  );

  const [zoom, setZoom] = useState(15);

  const BASE_SIZE = 49;
  const markerSize =
    zoom >= 15 ? BASE_SIZE : Math.max(20, BASE_SIZE * (zoom / 15) * 0.9);
  const innerSize = markerSize * 0.61;

  const properties = useMemo(
    () =>
      relatedProperties
        ?.filter((p) => p.property_latitude && p.property_longitude)
        .map((property, index) => ({
          id: index + 1,
          name: property.property_name,
          lat: Number(property.property_latitude),
          lng: Number(property.property_longitude),
          status: property.property_status,
          image: property.featured_image_desktop,
        })) ?? [],
    [relatedProperties],
  );

  const defaultCenter =
    communityCoordinates?.length > 0
      ? communityCoordinates[0]
      : { lat: 25.291063, lng: 55.337229 };

  return (
    <section
      data-header="dark"
      className={`w-full ${!pt ? "pt-0" : "pt-[70px] lg:pt-120 3xl:pt-160"
        } pb-[70px] lg:pb-120 3xl:pb-160`}
    >
      <div className="h-[488px] lg:h-[839px]">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={16}
            mapId="2567b86b459988d06657407f"
            className="w-full h-full"
            gestureHandling={"cooperative"}
            disableDefaultUI={true}
            onZoomChanged={(e) => setZoom(e.detail.zoom)}
          >
            <GrayscaleStyles />

            <FitBoundsToMarkers
              communityCoordinates={communityCoordinates}
              properties={properties.map((p) => ({ lat: p.lat, lng: p.lng }))}
            />

            {/* COMMUNITY POLYGON */}
            {communityCoordinates?.length > 0 && (
              <Polygon
                paths={communityCoordinates}
                fillColor="#490905"
                fillOpacity={0.5}
                strokeColor="#171717"
                strokeOpacity={1}
                strokeWeight={3}
              />
            )}

            {/* PROPERTY MARKERS WITH IMAGE */}
            {properties?.map((property) => (
              <AdvancedMarker
                key={property.id}
                position={{ lat: property.lat, lng: property.lng }}
                title={property.name}
              >
                <div
                  className="relative flex items-center justify-center"
                  style={{ width: markerSize, height: markerSize }}
                >
                  <div className="absolute inset-0 rounded-full border border-[#490905] bg-[#490905]/10" />
                  <div
                    className="rounded-full overflow-hidden z-10"
                    style={{ width: innerSize, height: innerSize }}
                  >
                    {property.image ? (
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#490905]" />
                    )}
                  </div>
                </div>
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>
    </section>
  );
};

export default MapOriginal;
