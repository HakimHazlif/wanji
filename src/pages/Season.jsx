import EpisodesList from "../features/season/EpisodesList";
import SeasonCredits from "../features/season/SeasonCredits";
import SeasonImages from "../features/season/SeasonImages";
import SeasonIntroDetails from "../features/season/SeasonIntroDetails";
import { useSeason } from "../features/season/useSeason";
import Spinner from "../ui/Spinner";
import { getPictureUrlFormat } from "../utils/helper";

const Season = () => {
  const { isLoading, seasonDetails } = useSeason();

  if (isLoading) return <Spinner />;

  return (
    <div className="py-10">
      <div className="padding-x">
        <SeasonIntroDetails />
        <EpisodesList />

        <section className="flex gap-10 py-32">
          <SeasonImages />
        </section>
        <SeasonCredits />
        {/* <List title="More like this">
      {similar?.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </List> */}

        {/* 
    <ShowSimilar similar={similar} />
    <ShowReviews reviews={reviews} /> */}
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
