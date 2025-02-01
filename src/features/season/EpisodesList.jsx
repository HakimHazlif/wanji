import { Link } from "react-router";
import EpisodeCard from "../episode/EpisodeCard";
import { useSeason } from "./useSeason";

const EpisodesList = () => {
  const { episodes, seasonDetails } = useSeason();
  const { season_number, showId, seasons } = seasonDetails;
  console.log(seasonDetails);

  return (
    <div className="py-32">
      <div className="mb-10 border-b border-slate-700 pb-4 flex justify-between items-center">
        <h2 className="text-4xl font-semibold">
          Episodes of the {seasonDetails.name}
        </h2>
        <p className="text-2xl font-semibold">{episodes.length} Episodes</p>
      </div>
      <div className="grid grid-flow-row gap-8">
        {episodes.length > 0 ? (
          <>
            {episodes.map((episode) => (
              <EpisodeCard episode={episode} key={episode.id} />
            ))}
          </>
        ) : (
          <div className="w-full h-[200px] bg-bluish-black rounded-2xl flex justify-center items-center font-bold text-xl">
            <p className="w-[450px] text-center">
              Sorry, there are no episodes available for this season.
            </p>
          </div>
        )}
      </div>
      <div className="flex items-end justify-center mt-20">
        <div className="flex gap-4 items-center">
          <p className="text-slate-300 font-bold text-xl">Seasons</p>
          {seasons.map(
            (season) =>
              season.season_number !== 0 && (
                <Link
                  to={`/tv/${showId}/season/${season.season_number}`}
                  key={season.id}
                  className={`h-12 w-12 text-xl font-bold rounded-full flex justify-center items-center duration-300 transition-colors  ${
                    season.season_number === season_number
                      ? "bg-orange-amber cursor-not-allowed"
                      : "bg-slate-600 hover:bg-bluish-black"
                  }`}
                >
                  {season.season_number}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodesList;
