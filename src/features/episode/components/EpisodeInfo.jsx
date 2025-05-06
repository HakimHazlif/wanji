import { useParams } from "react-router-dom";
import { useEpisode } from "../hooks/useEpisode";
import { getPictureUrlFormat, updateDateFormat } from "../../../utils/helper";
import RatingBox from "../../../components/RatingBox";
import Ellipsis from "../../../ui/Ellipsis";
import EmptyPoster from "../../../components/EmptyPoster";
import WatchlistButton from "../../userLists/buttons/WatchlistButton";
import FavoriteButton from "../../userLists/buttons/FavoriteButton";
import AddToListButton from "../../userLists/buttons/AddToListButton";
import RateUser from "../../userLists/buttons/RateUser";

const EpisodeInfo = () => {
  const { episodeDetails } = useEpisode();
  const {
    id,
    still_path,
    name,
    season_number,
    episode_number,
    air_date,
    runtime,
    vote_average,
    overview,
  } = episodeDetails;

  const { id: parentId } = useParams();

  const item = {
    itemId: id,
    type: "episode",
    parentId: parentId,
    episode: episode_number,
    season: season_number,
  };

  return (
    <section>
      <div className="flex lg:flex-row flex-col-reverse gap-10 items-end">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-bold mb-3">{name}</h2>
          <h3 className="text-xl font-semibold text-slate-200">
            {`Episode ${episode_number} - Season ${season_number}`}
          </h3>
          <ul className="flex flex-wrap gap-2 text-sm font-semibold text-slate-300">
            <li>{updateDateFormat(air_date)}</li>
            <span>&#x2022;</span>
            <li>{runtime} min</li>
          </ul>
          <RatingBox
            rating={vote_average}
            styleOfSpan="px-2 py-0.5 rounded-sm bg-orange-amber text-white font-semibold"
            minWidth={1024}
          />

          <Ellipsis text={overview} />
        </div>
        <div>
          {still_path ? (
            <img
              src={getPictureUrlFormat(still_path, 1280)}
              alt="movie poster"
              className="rounded-xl xl:max-w-[560px] lg:max-w-[500px] md:max-w-[560px]"
            />
          ) : (
            <EmptyPoster size={80} style="rounded-xl max-w-[500px]" />
          )}
        </div>
      </div>
      <hr className="border-1 border-slate-400 w-full my-4" />
      <div className="md:flex justify-between items-center gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <WatchlistButton
            item={item}
            iconSize="md:text-3xl sm:text-xl text-lg"
          />
          <FavoriteButton
            item={item}
            iconSize="md:text-3xl sm:text-xl text-lg"
          />
          <AddToListButton
            item={item}
            image={still_path}
            showTitle={name}
            iconSize="md:text-3xl sm:text-xl text-lg"
          />
          <div className="md:hidden">
            <RateUser item={item} />
          </div>
        </div>
        <div className="max-md:hidden flex max-md:mt-4 gap-2">
          <RateUser item={item} />
        </div>
      </div>
    </section>
  );
};

export default EpisodeInfo;
