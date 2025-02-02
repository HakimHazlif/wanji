import { useNavigate } from "react-router";
import EpisodeCard from "../episode/EpisodeCard";
import { useSeason } from "./useSeason";
import Pagination from "../../components/Pagination";

const EpisodesList = () => {
  const navigate = useNavigate();
  const { episodes, seasonDetails } = useSeason();
  const { season_number, showId, seasons } = seasonDetails;
  const totalPages = seasons.filter(
    (season) => season.name !== "Specials"
  )?.length;

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

      {totalPages > 1 && (
        <div className="flex items-end justify-center mt-20">
          <Pagination
            totalPages={totalPages}
            currentPage={season_number}
            changePage={(page) => {
              if (typeof page === "number" && page >= 1 && page <= totalPages) {
                navigate(`/tv/${showId}/season/${page}`);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EpisodesList;
