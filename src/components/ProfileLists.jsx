import { useSelector } from "react-redux";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import { useLists } from "../features/userLists/hooks/useLists";
import { useRatingList } from "../features/userLists/hooks/useRatingList";
import { useMemo } from "react";
import Spinner from "../ui/Spinner";
import ListScroll from "./ListScroll";
import MediaCard from "../ui/MediaCard";
import { useUserReviewsList } from "../features/reviews/hooks/useUserReviewsList";
import { useShortLists } from "../features/userLists/hooks/useShortLists";
import EmptyShortList from "./EmptyShortList";
import ProfileCustomLists from "./ProfileCustomLists";
import ProfileReviews from "../features/reviews/components/ProfileReviews";
import EmptyListButton from "./EmptyListButton";

const ProfileLists = () => {
  const { transitionNavigate } = useTransitionNavigate();
  const { username } = useSelector((state) => state.user.user);
  const usernameUrl = username.replace(" ", "-");
  const { watchlist, favoriteList } = useLists();
  const { ratingList } = useRatingList();
  const { reviewsList } = useUserReviewsList();

  const profileLists = useMemo(() => {
    return {
      watchlistItems: watchlist?.items_list?.slice(0, 8) ?? [],
      favoriteListItems: favoriteList?.items_list?.slice(0, 8) ?? [],
      ratingListItems: ratingList?.slice(0, 8) ?? [],
      reviewsListItems: reviewsList?.slice(0, 4) ?? [],
    };
  }, [
    watchlist?.items_list,
    favoriteList?.items_list,
    reviewsList,
    ratingList,
  ]);

  const {
    watchlistItems,
    favoriteListItems,
    ratingListItems,
    reviewsListItems,
  } = profileLists;

  const {
    shortWatchlist,
    shortFavorites,
    shortRatings,
    shortReviews,
    isLoading,
  } = useShortLists(
    watchlistItems,
    favoriteListItems,
    ratingListItems,
    reviewsListItems
  );

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

  const shortReviewsItems = useMemo(() => {
    return shortReviews?.map((item, index) => ({
      ...item,
      review: reviewsListItems?.[index]?.review,
      created_at: reviewsListItems?.[index]?.created_at,
    }));
  }, [shortReviews, reviewsListItems]);

  function navigateToPopularMovies() {
    transitionNavigate("/movies?movie-tag=popular&page=1");
  }

  if (isLoading) return <Spinner />;

  return (
    <section className="padding-x">
      <div className="mt-32">
        <ListScroll
          title="My Ratings"
          path={`/u/${usernameUrl}/Ratings`}
          emptyChildren={shortRatingsItems?.length > 0 ? false : true}
        >
          {shortRatingsItems?.length > 0 ? (
            shortRatingsItems?.map((item) => (
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
            <EmptyShortList listName="Rating">
              <EmptyListButton handleClick={navigateToPopularMovies}>
                Explore the Popular movies
              </EmptyListButton>
            </EmptyShortList>
          )}
        </ListScroll>
      </div>

      <div className="mt-32">
        <ListScroll
          title="My Watchlist"
          path={`/u/${usernameUrl}/Watchlist`}
          emptyChildren={shortWatchlistItems?.length > 0 ? false : true}
        >
          {shortWatchlistItems?.length > 0 ? (
            shortWatchlistItems?.map((item) => (
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
            <EmptyShortList listName="Watchlist">
              <EmptyListButton handleClick={navigateToPopularMovies}>
                Explore the Popular movies
              </EmptyListButton>
            </EmptyShortList>
          )}
        </ListScroll>
      </div>

      <div className="mt-32">
        <ListScroll
          title="My Favorites"
          path={`/u/${usernameUrl}/Favorites`}
          emptyChildren={shortFavoritesItems?.length > 0 ? false : true}
        >
          {shortFavoritesItems?.length > 0 ? (
            shortFavoritesItems?.map((item) => (
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
            <EmptyShortList listName="Favorite">
              <EmptyListButton handleClick={navigateToPopularMovies}>
                Explore the Popular movies
              </EmptyListButton>
            </EmptyShortList>
          )}
        </ListScroll>
      </div>

      <ProfileCustomLists />

      <ProfileReviews reviews={shortReviewsItems} />
    </section>
  );
};

export default ProfileLists;
