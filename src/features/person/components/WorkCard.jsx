import EmptyPoster from "../../../components/EmptyPoster";
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate";
import { getPictureUrlFormat } from "../../../utils/helper";
import Ellipsis from "../../../ui/Ellipsis";
import WatchlistButton from "../../userLists/buttons/WatchlistButton";
import FavoriteButton from "../../userLists/buttons/FavoriteButton";
import AddToListButton from "../../userLists/buttons/AddToListButton";
import WorkCardDetails from "./WorkCardDetails";

const WorkCard = ({ show, category }) => {
  const { transitionNavigate } = useTransitionNavigate();

  const { id, overview, poster_path, show_id, episode_number, season_number } =
    show;
  const title = show?.title || show?.name;

  const item = {
    itemId: id,
    type: category,
    parentId: show_id,
    episode: episode_number,
    season: season_number,
  };

  function handleNavigate() {
    transitionNavigate(`/${category}/${id}`);
  }

  return (
    <div className="w-full rounded-2xl bg-[#0000]/20 shadow-lg transition-shadow flex md:flex-row flex-col p-2 xl:gap-6 lg:gap-4 gap-1">
      <div className="md:max-w-[200px] max-w-full flex">
        <div className="md:max-w-full xs:max-w-[200px] w-full max-xs:flex justify-center">
          {poster_path ? (
            <img
              src={getPictureUrlFormat(poster_path)}
              alt={title}
              className="h-full w-full max-xs:w-[200px] object-cover cursor-pointer rounded-md"
              onClick={handleNavigate}
            />
          ) : (
            <EmptyPoster size={80} style="h-full w-[205px] rounded-md" />
          )}
        </div>
        <div className="md:hidden flex-1 xs:flex flex-col hidden gap-2 px-2 py-4">
          <WorkCardDetails
            handleNavigate={handleNavigate}
            show={show}
            item={item}
            category={category}
          />
        </div>
      </div>

      <div className="flex-1 xs:px-2 lg:px-4 lg:pt-4 xs:pt-2 pb-2 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          <div className="md:flex flex-col gap-2 xs:hidden flex">
            <WorkCardDetails
              handleNavigate={handleNavigate}
              show={show}
              item={item}
              category={category}
            />
          </div>

          {overview && (
            <div className="text-sm text-slate-400 mb-2">
              <Ellipsis text={overview} lines="md:line-clamp-2 line-clamp-3" />
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full items-end">
          <div className="w-1/3">
            <WatchlistButton
              item={item}
              iconSize="lg:text-lg text-md"
              width="w-full"
            />
          </div>
          <div className="w-1/3">
            <FavoriteButton
              item={item}
              iconSize="lg:text-lg text-md"
              width="w-full"
            />
          </div>
          <div className="w-1/3">
            <AddToListButton iconSize="lg:text-lg text-md" width="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
