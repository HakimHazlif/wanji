import { Link } from "react-router";
import EpisodeCard from "../episode/EpisodeCard";
import { useSeason } from "./useSeason";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const EpisodesList = () => {
  const { episodes, seasonDetails } = useSeason();
  const { season_number, showId } = seasonDetails;

  return (
    <div className="py-32">
      <div className="flex gap-2 items-end mb-10">
        <h2 className="text-4xl font-bold">{seasonDetails.name}</h2>
        <p>({episodes.length} episodes)</p>
      </div>
      <div className="grid grid-flow-row gap-8">
        {episodes[0].runtime && episodes[0].vote_average ? (
          <>
            {episodes.map((episode) => (
              <EpisodeCard episode={episode} key={episode.id} />
            ))}
          </>
        ) : (
          <div className="w-full h-[200px] bg-bluish-black rounded-2xl flex justify-center items-center font-bold text-xl">
            <p className="w-[450px] text-center">
              Sorry, there are no episodes available for this season yet.
            </p>
          </div>
        )}
      </div>
      <div
        className={`flex items-center py-10 ${
          season_number === 1 ? "justify-end" : "justify-between"
        } `}
      >
        {season_number !== 1 && (
          <Link
            to={`/tv/${showId}/season/${season_number - 1}`}
            className="flex gap-2 items-center text-xl font-bold hover:text-orange-coral"
          >
            <IoIosArrowBack className="text-2xl" />
            <h2>Go back to season{season_number - 1}</h2>
          </Link>
        )}
        {season_number < seasonDetails.seasons.length && (
          <Link
            to={`/tv/${showId}/season/${season_number + 1}`}
            className="flex gap-2 items-center text-xl font-bold hover:text-orange-coral"
          >
            <h2>Go to season {season_number + 1}</h2>
            <IoIosArrowForward className="text-2xl" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default EpisodesList;
