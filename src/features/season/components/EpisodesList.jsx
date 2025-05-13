import EpisodeCard from "../../episode/components/EpisodeCard";
import Pagination from "../../../components/Pagination";
import { useSeason } from "../hooks/useSeason";
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate";
import { useItemsStatus } from "../../userLists/hooks/useItemsStatus";
import Spinner from "../../../ui/Spinner";

const EpisodesList = () => {
  const { transitionNavigate } = useTransitionNavigate();
  const { episodes, seasonDetails } = useSeason();
  const { season_number, showId, seasons } = seasonDetails;

  const episodeIds = episodes.map((el) => el.id);
  const { isLoading } = useItemsStatus(episodeIds, "episode");

  const totalPages = seasons.filter(
    (season) => season.name !== "Specials"
  )?.length;

  return (
    <section className="">
      <div className="mb-10 border-b border-slate-700 pb-4 flex justify-between items-center">
        <h2 className="heading-title-1">
          Episodes of the {seasonDetails.name}
        </h2>
        <p className="heading-title-2 text-slate-400">
          {episodes.length} Episodes
        </p>
      </div>
      {!isLoading ? (
        <div>
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
                  if (
                    typeof page === "number" &&
                    page >= 1 &&
                    page <= totalPages
                  ) {
                    transitionNavigate(`/tv/${showId}/season/${page}`);
                  }
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default EpisodesList;
