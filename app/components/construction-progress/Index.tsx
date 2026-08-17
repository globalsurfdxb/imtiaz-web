import EventHero from "./sections/EventHero";
import ConstructionProgress from "./sections/ConstructionProgress";

const Index = ({ data }: { data: any }) => {
  const transformedData = Object.entries(data?.gallery || {})
    .sort(([a], [b]) => Number(b) - Number(a)) // newest year first
    .map(([year, months]) => ({
      year,
      months: Object.entries(months as Record<string, any[]>).map(
        ([month, images]) => ({
          month,
          date: `${month.toUpperCase()} ${year}`,
          location: data.page_banner_title,
          images: images.map((img) => ({
            src: img.image_url,
            alt: img.caption || `${month} ${year}`,
          })),
        }),
      ),
    }));

  return (
    <>
      <div
        className={`${data?.gallery && Object.keys(data?.gallery).length > 0 ? "" : "pb-[70px] md:pb-120 3xl:pb-160"}`}
      >
        <EventHero title={data?.page_banner_title} />
      </div>
      {data?.gallery && Object.keys(data?.gallery).length > 0 && (
        <ConstructionProgress data={transformedData} />
      )}
    </>
  );
};

export default Index;
