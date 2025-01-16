import { useEpisode } from "../features/episode/useEpisode";
import Spinner from "../ui/Spinner";
import { getPictureUrlFormat } from "../utils/helper";

import EpisodeInfo from "../features/episode/EpisodeInfo";
import ShowImages from "../features/show/ShowImages";
import Crew from "../features/episode/Crew";
import Casting from "../features/episode/Casting";

const Episode = () => {
  const { isLoading, episodeDetails, episodeImage } = useEpisode();

  if (isLoading) return <Spinner />;

  return (
    <main className="pt-60 pb-20">
      <div className="padding-x ">
        <EpisodeInfo />
        <section className="flex gap-10 py-32">
          <div>
            <ShowImages images={episodeImage} />
            <Casting />
          </div>
          <Crew />
        </section>
        <div className="absolute top-0 right-0 w-full -z-10 ">
          <img
            src={getPictureUrlFormat(episodeDetails?.still_path, 1280)}
            alt="backdrop of movie"
            className="h-[600px] w-full object-cover object-center masking"
          />
          <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
        </div>
      </div>
    </main>
  );
};

export default Episode;
