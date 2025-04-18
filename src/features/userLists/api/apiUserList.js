import axios from "axios";
import supabase from "../../../services/supabase";
import { options, URL_Base } from "../../../services/variables";

export async function getAllUserLists(id) {
  const { data: lists, error } = await supabase
    .from("lists")
    .select(
      `
      id,
      name,
      created_at,
      description,
      items_list (*)
    `
    )
    .eq("user_id", id);

  if (error) throw new Error(error);

  return lists;
}

export async function fetchItemsStatus({
  itemIds = [],
  type,
  watchlistId,
  favoriteListId,
  userId,
}) {
  if (!itemIds?.length) return new Map();
  if (!itemIds?.length || !watchlistId || !favoriteListId || !userId)
    return new Map();

  try {
    const [watchlistResponse, favoritesResponse, ratingsResponse] =
      await Promise.all([
        supabase
          .from("items_list")
          .select("item_id")
          .eq("list_id", watchlistId)
          .eq("type", type)
          .in("item_id", itemIds),

        supabase
          .from("items_list")
          .select("item_id")
          .eq("list_id", favoriteListId)
          .eq("type", type)
          .in("item_id", itemIds),

        supabase
          .from("rating")
          .select("item_id, rate")
          .eq("user_id", userId)
          .eq("type", type)
          .in("item_id", itemIds),
      ]);

    if (watchlistResponse.error) throw watchlistResponse.error;
    if (favoritesResponse.error) throw favoritesResponse.error;
    if (ratingsResponse.error) throw ratingsResponse.error;

    const watchlistSet = new Set(
      watchlistResponse.data.map((item) => Number(item.item_id))
    );
    const favoritesSet = new Set(
      favoritesResponse.data.map((item) => Number(item.item_id))
    );
    const ratingsMap = new Map(
      ratingsResponse.data.map((item) => [Number(item.item_id), item.rate])
    );

    // return itemIds.reduce((acc, id) => {
    //   acc[id] = {
    //     inWatchlist: watchlistSet.has(id),
    //     inFavorites: favoritesSet.has(id),
    //     rating: ratingsMap.get(id) || null,
    //   };

    //   return acc;
    // }, {});

    return new Map(
      itemIds.map((id) => [
        id,
        {
          inWatchlist: watchlistSet.has(id),
          inFavorites: favoritesSet.has(id),
          rating: ratingsMap.get(id) || null,
        },
      ])
    );
  } catch (error) {
    console.error("Error fetching items status:", error);
    throw new Error(`Failed to fetch items status: ${error.message}`);
  }
}

export async function fetchItemStatus(
  id,
  type,
  watchlistId,
  favoriteListId,
  userId
) {
  if (!id || !type || !userId) return new Map();

  try {
    const [listsResponse, ratingsResponse] = await Promise.all([
      supabase
        .from("lists")
        .select("id, items_list!inner(item_id)")
        .eq("user_id", userId)
        .eq("items_list.item_id", id),

      supabase
        .from("rating")
        .select("rate")
        .eq("user_id", userId)
        .eq("type", type)
        .eq("item_id", id),
    ]);

    if (listsResponse.error) throw listsResponse.error;
    if (ratingsResponse.error) throw ratingsResponse.error;

    const listIds = new Set(listsResponse?.data?.map((item) => item.id));
    const inWatchlist = listIds.has(watchlistId);
    const inFavorites = listIds.has(favoriteListId);

    listIds.delete(watchlistId);
    listIds.delete(favoriteListId);

    const itemMap = new Map();

    itemMap.set(id, {
      inWatchlist,
      inFavorites,
      rating: ratingsResponse?.data[0]?.rate ?? null,
      remainLists: listIds,
    });

    return itemMap;
  } catch (error) {
    console.error("Error fetching item status:", error);
    throw new Error(`Failed to fetch item status: ${error.message}`);
  }
}

export async function fetchLastFavorite(favoriteId) {
  const { data: movie, error: movieIdError } = await supabase
    .from("items_list")
    .select("item_id")
    .eq("list_id", favoriteId)
    .eq("type", "movie")
    .order("created_at", { ascending: false })
    .limit(1);

  const { data: tvShow, error: tvIdError } = await supabase
    .from("items_list")
    .select("item_id")
    .eq("list_id", favoriteId)
    .eq("type", "tv")
    .order("created_at", { ascending: false })
    .limit(1);

  if (movieIdError) throw new Error(movieIdError.message);
  if (tvIdError) throw new Error(tvIdError.message);

  return { movieId: movie?.[0]?.item_id, tvId: tvShow?.[0]?.item_id };
}

export async function getRatingList({ userId }) {
  if (userId) {
    const { data: rating, error } = await supabase
      .from("rating")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error);

    return { rating };
  }
}

export async function getVisualMediaRating({ itemId, type, userId }) {
  if (userId && itemId && type) {
    const { data: rate, error } = await supabase
      .from("rating")
      .select("rate")
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .eq("type", type);

    if (error) throw new Error(error);

    return rate;
  }
}

export const fetchShortLists = async (
  watchlist,
  favoritesList,
  ratingList,
  reviewslist
) => {
  const watchlistLength = watchlist?.length ?? 0;
  const favoritesLength = favoritesList?.length ?? 0;
  const ratingListLength = ratingList?.length ?? 0;
  const reviewsListLength = reviewslist?.length ?? 0;

  if (
    !watchlistLength &&
    !favoritesLength &&
    !ratingListLength &&
    !reviewsListLength
  )
    return;

  const generateUrls = (list) =>
    list?.map((item) =>
      item.type === "episode"
        ? `${URL_Base}tv/${item.parent_id}/season/${item.season_number}/episode/${item.episode_number}?append_to_response=credits&language=en-US`
        : `${URL_Base}${item.type}/${item.item_id}?append_to_response=credits&language=en-US`
    ) || [];

  const itemsUrls = [
    ...generateUrls(watchlist),
    ...generateUrls(favoritesList),
    ...generateUrls(ratingList),
    ...generateUrls(reviewslist),
  ];
  const results = await axios.all(
    itemsUrls.map((url) => axios.get(url, options))
  );

  const watchlistItems = results
    .slice(0, watchlistLength)
    ?.map((result) => result.data);
  const favoritesItems = results
    .slice(watchlistLength, favoritesLength + watchlistLength)
    ?.map((result) => result.data);
  const ratingItems = results
    .slice(
      favoritesLength + watchlistLength,
      favoritesLength + watchlistLength + ratingListLength
    )
    ?.map((result) => result.data);
  const reviewsItems = results
    .slice(favoritesLength + watchlistLength + ratingListLength, results.length)
    ?.map((result) => result.data);

  return {
    shortWatchlist: watchlistItems,
    shortFavorites: favoritesItems,
    shortRatings: ratingItems,
    shortReviews: reviewsItems,
  };
};

export const fetchItemsList = async (listId, list, startPoint = 0) => {
  if (!listId) return "listId is undefinded";

  if (list?.length === 0 || list?.length <= startPoint) {
    return { items: [], listId, nextPoint: null };
  }

  const showsUrl = list.slice(startPoint, startPoint + 50).map((show) => {
    if (show.type === "movie" || show.type === "tv")
      return `${URL_Base}${show.type}/${show.item_id}?append_to_response=credits&language=en-US`;
    if (show.type === "episode")
      return `${URL_Base}tv/${show.parent_id}/season/${show.season_number}/episode/${show.episode_number}?append_to_response=credits&language=en-US`;
  });

  const results = await axios.all(
    showsUrl.map((url) => axios.get(url, options))
  );
  const items = results.map((result) => result.data);

  return { items: items, listId, nextPoint: startPoint + items.length };
};
