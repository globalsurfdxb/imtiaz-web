"use client";

import { Map, Marker } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SectionHeading } from "../../animations/SectionHeading";

interface Props {
  latitude: string;
  longitude: string;
  title?: string;
}

const MapOriginal = ({
  title,
  latitude = "25.1972",
  longitude = "55.2744",
}: {
  title: string;
  latitude: string;
  longitude: string;
}) => {
  // const latitude = "25.1972";
  // const longitude = "55.2744";
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  return (
    <section data-header="dark" className="w-full pb-120 3xl:pb-130">
      <div className="hidden md:block container">
        <SectionHeading
          title={title}
          className="text-heading  text-foreground mb-50"
        />

        <div className="h-[500px] lg:h-[784px]">
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
          >
            <Map
              defaultCenter={{ lat, lng }}
              defaultZoom={15}
              mapId="2567b86b459988d06657407f"
              className="w-full h-full"
              disableDefaultUI={true}
            >
              <Marker
                position={{ lat, lng }}
                icon={{
                  url: "/active-icon.svg", // always active icon
                }}
              />
            </Map>
          </APIProvider>
        </div>
      </div>

    <div className="md:hidden content-spacing-mobile-padding">
        <SectionHeading
          as="h3"
          title={"our head office"}
          className="text-heading text-center  text-foreground mb-6 md:mb-50 container"
        />

        <div className="h-[488px]">
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
          >
            <Map
              defaultCenter={{ lat, lng }}
              defaultZoom={15}
              mapId="2567b86b459988d06657407f"
              className="w-full h-full"
              disableDefaultUI={true}
            >
              <Marker
                position={{ lat, lng }}
                icon={{
                  url: "/active-icon.svg", // always active icon
                }}
              />
            </Map>
          </APIProvider>
        </div>
      </div>
    </section>
  );
};

export default MapOriginal;
