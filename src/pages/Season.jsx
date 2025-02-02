import EpisodesList from "../features/season/EpisodesList";
import SeasonIntro from "../features/season/SeasonIntro";
import { useSeason } from "../features/season/useSeason";
import Spinner from "../ui/Spinner";
import { getPictureUrlFormat } from "../utils/helper";

const Season = () => {
  const { isLoading, seasonDetails } = useSeason();

  if (isLoading) return <Spinner />;

  return (
    <div className="py-10">
      <div className="padding-x">
        <SeasonIntro />
        <section className="pt-32">
          <EpisodesList />
        </section>
      </div>
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={getPictureUrlFormat(seasonDetails.poster_path, 1280)}
          alt="backdrop of movie"
          className="h-[600px] w-full object-cover object-center masking"
        />
        <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>
    </div>
  );
};

export default Season;
