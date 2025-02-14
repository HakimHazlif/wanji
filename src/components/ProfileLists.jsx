import { useSelector } from "react-redux";
import ListScroll from "../features/lists/ListScroll";
import { useLists } from "../features/lists/useLists";
import { useRatingList } from "../features/lists/useRatingList";
import { useShortLists } from "../features/userLists/useShortLists";
import Spinner from "../ui/Spinner";
import { useCallback, useMemo } from "react";
import ShowCard from "../ui/ShowCard";
import CustomListCard from "../ui/CustomListCard";
import ProfileCustomLists from "./ProfileCustomLists";

const ProfileLists = () => {
  const { username } = useSelector((state) => state.user.user);
  const usernameUrl = username.replace(" ", "-");
  const { watchlist, favoriteList, remainLists } = useLists();
  const { ratingList } = useRatingList();

  const watchlistItems = watchlist?.items_list.slice(0, 8);
  const favoriteListItems = favoriteList?.items_list.slice(0, 8);
  const ratingListItems = ratingList?.slice(0, 8);

  const { shortWatchlist, shortFavorites, shortRatings, isLoading } =
    useShortLists(watchlistItems, favoriteListItems, ratingListItems);

  const mapItemsWithParentId = (list, referenceList) =>
    list?.length > 0
      ? referenceList?.map((item, index) =>
          item?.parent_id
            ? { ...list[index], show_id: item.parent_id }
            : list[index]
        )
      : [];

  const shortWatchlistItems = useMemo(
    () => mapItemsWithParentId(shortWatchlist, watchlistItems),
    [shortWatchlist, watchlistItems]
  );

  const shortFavoritesItems = useMemo(
    () => mapItemsWithParentId(shortFavorites, favoriteListItems),
    [shortFavorites, favoriteListItems]
  );

  const shortRatingsItems = useMemo(
    () => mapItemsWithParentId(shortRatings, ratingListItems),
    [shortRatings, ratingListItems]
  );

  if (isLoading) return <Spinner />;

  return (
    <section className="padding-x">
      {shortRatingsItems?.length > 0 && (
        <div className="mt-32">
          <ListScroll title="My Ratings" path={`/u/${usernameUrl}/Ratings`}>
            {shortRatingsItems?.map((item) => (
              <ShowCard
                key={item?.id}
                show={item}
                category={
                  item?.name ? (item?.air_date ? "episode" : "tv") : "movie"
                }
                parentShowId={item?.show_id ?? null}
              />
            ))}
          </ListScroll>
        </div>
      )}
      {shortWatchlistItems?.length > 0 && (
        <div className="mt-32">
          <ListScroll title="My Watchlist" path={`/u/${usernameUrl}/Watchlist`}>
            {shortWatchlistItems?.map((item) => (
              <ShowCard
                key={item?.id}
                show={item}
                category={
                  item?.name ? (item?.air_date ? "episode" : "tv") : "movie"
                }
                parentShowId={item?.show_id ?? null}
              />
            ))}
          </ListScroll>
        </div>
      )}
      {shortFavoritesItems?.length > 0 && (
        <div className="mt-32">
          <ListScroll title="My Favorites" path={`/u/${usernameUrl}/Favorites`}>
            {shortFavoritesItems?.map((item) => (
              <ShowCard
                key={item?.id}
                show={item}
                category={
                  item?.name ? (item?.air_date ? "episode" : "tv") : "movie"
                }
                parentShowId={item?.show_id ?? null}
              />
            ))}
          </ListScroll>
        </div>
      )}
      {remainLists?.length > 0 && <ProfileCustomLists />}
    </section>
  );
};

export default ProfileLists;
