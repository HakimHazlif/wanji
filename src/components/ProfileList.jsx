import { useMemo } from "react";
import { useLists } from "../features/userLists/hooks/useLists";
import { useRatingList } from "../features/userLists/hooks/useRatingList";
import { useShortList } from "../features/userLists/hooks/useShortList";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import { useSelector } from "react-redux";
import ListScroll from "./ListScroll";
import Spinner from "../ui/Spinner";
import MediaCard from "../ui/MediaCard";
import EmptyShortList from "./EmptyShortList";
import EmptyListButton from "./EmptyListButton";

const ProfileList = ({ listName }) => {
  const { transitionNavigate } = useTransitionNavigate();
  const { username } = useSelector((state) => state.user.user);
  const usernameUrl = username.replace(" ", "-");
  const listNameUpper =
    listName.charAt(0).toUpperCase() + listName.substring(1);

  const { watchlist, favoriteList } = useLists();
  const { ratingList } = useRatingList();

  const profileList = useMemo(() => {
    switch (listName) {
      case "watchlist":
        return watchlist?.items_list?.slice(0, 8) ?? [];
      case "favorites":
        return favoriteList?.items_list?.slice(0, 8) ?? [];
      case "ratings":
        return ratingList?.slice(0, 8) ?? [];
      default:
        return watchlist?.items_list?.slice(0, 8) ?? [];
    }
  }, [watchlist?.items_list, favoriteList?.items_list, ratingList, listName]);

  const { shortList, isLoading } = useShortList(profileList, listName);

  const mapItemsWithParentId = (list, referenceList) =>
    list?.length > 0
      ? referenceList?.map((item, index) =>
          item?.parent_id
            ? { ...list[index], show_id: item.parent_id }
            : list[index]
        )
      : [];

  const shortListItems = useMemo(
    () => mapItemsWithParentId(shortList, profileList),
    [shortList, profileList]
  );

  function navigateToPopularMovies() {
    transitionNavigate("/movies?movies-tag=popular&page=1");
  }

  return (
    <div className="mt-32">
      <ListScroll
        title={`My ${listNameUpper}`}
        path={`/u/${usernameUrl}/${listNameUpper}`}
        emptyChildren={shortListItems?.length > 0 ? false : true}
      >
        {isLoading ? (
          <Spinner />
        ) : shortListItems?.length > 0 ? (
          shortListItems?.map((item) => (
            <MediaCard
              key={item?.id}
              show={item}
              category={
                item?.name ? (item?.air_date ? "episode" : "tv") : "movie"
              }
              parentShowId={item?.show_id ?? null}
            />
          ))
        ) : (
          <EmptyShortList listName={listNameUpper}>
            <EmptyListButton handleClick={navigateToPopularMovies}>
              Explore the Popular movies
            </EmptyListButton>
          </EmptyShortList>
        )}
      </ListScroll>
    </div>
  );
};

export default ProfileList;
