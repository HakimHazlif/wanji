import { useVitualMedia } from "../hooks/useVitualMedia";

const MediaOverview = () => {
  const { details, images } = useVitualMedia();
  const { tagline, overview } = details;

  return (
    <section className={`${images?.length > 0 ? "md:w-2/5" : ""} w-full`}>
      <div className="mb-6 border-b border-slate-700 pb-3">
        <h2 className="heading-title-1 ">Overview</h2>
      </div>
      <div className="">
        {tagline && (
          <h3 className="font-medium text-xl text-slate-200">
            Tagline: {tagline}
          </h3>
        )}
        <p className="mt-4 text-slate-400">{overview}</p>
      </div>
    </section>
  );
};

export default MediaOverview;
