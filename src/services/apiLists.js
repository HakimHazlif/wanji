import axios from "axios";
import { options, URL_Base } from "../constants/variables";
import supabase from "./supabase";

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

export async function insertShow({
  id,
  listId,
  type,
  parentId = null,
  episode = null,
  season = null,
}) {
  const { data, error } = await supabase.from("items_list").insert([
    {
      item_id: id,
      list_id: listId,
      type: type,
      parent_id: parentId,
      episode_number: episode,
      season_number: season,
    },
  ]);

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteShow({ id, listId, type }) {
  const { error } = await supabase
    .from("items_list")
    .delete()
    .eq("item_id", id)
    .eq("list_id", listId)
    .eq("type", type);

  if (error) throw new Error(error);
}

export async function getShowRating({ itemId, type, userId }) {
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

export async function addRateToShow({
  itemId,
  type,
  rating,
  userId,
  parentId = null,
  season = null,
  episode = null,
}) {
  const { data, error } = await supabase
    .from("rating")
    .insert([
      {
        item_id: itemId,
        type: type,
        user_id: userId,
        rate: rating,
        parent_id: parentId,
        season_number: season,
        episode_number: episode,
      },
    ])
    .select("*");

  if (error) throw new Error(error);

  return { data, error };
}

export async function updateShowRate({ itemId, type, rating, userId }) {
  const { data, error } = await supabase
    .from("rating")
    .update({ rate: rating })
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .eq("type", type)
    .select("*");

  if (error) throw new Error(error);

  return { data, error };
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

export async function insertNewList({
  userId,
  name,
  description = null,
  itemId = null,
  type = null,
  parentId = null,
  episode = null,
  season = null,
}) {
  const listId = crypto.randomUUID();

  if (!userId) throw new Error("Should you sign up or log in to add a list");

  const { data: listData, error: listError } = await supabase
    .from("lists")
    .insert([
      { id: listId, user_id: userId, name: name, description: description },
    ])
    .select("*")
    .eq("user_id", userId);

  if (listError) throw new Error(listError);

  if (itemId && type) {
    const { data: itemData, error: itemError } = await supabase
      .from("items_list")
      .insert([
        {
          item_id: itemId,
          list_id: listId,
          type: type,
          parent_id: parentId,
          episode_number: episode,
          season_number: season,
        },
      ]);

    if (itemError) throw new Error(itemError);

    return { listData, itemData, error: null };
  }

  return { listData, listError };
}

export async function deleteList({ userId, listId }) {
  if (!userId || !listId) throw new Error("the user_id or list_id is undefind");

  const { error: errorItems } = await supabase
    .from("items_list")
    .delete()
    .eq("list_id", listId);

  if (errorItems) throw new Error(errorItems);

  const { error: errorList } = await supabase
    .from("lists")
    .delete()
    .eq("id", listId)
    .eq("user_id", userId);

  if (errorList) throw new Error(errorList);

  return { errorList };
}

export async function updateList({
  userId,
  listId,
  newName = null,
  newDescription = null,
}) {
  if (!userId)
    throw new Error(
      "Should you sign up or log in to update the name of the list"
    );
  if (!listId) throw new Error("the list_id is undefind");

  if (newName) {
    const { data, error } = await supabase
      .from("lists")
      .update({ name: newName })
      .eq("id", listId)
      .select("*")
      .single();

    if (error) throw new Error(error);

    return { data, error };
  }
  if (newDescription) {
    const { data, error } = await supabase
      .from("lists")
      .update({ description: newDescription })
      .eq("id", listId)
      .select("*")
      .single();

    if (error) throw new Error(error);

    return { data, error };
  }
}

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

export async function fetchItemsStatus({
  itemIds = [],
  type,
  watchlistId,
  favoriteListId,
  userId,
}) {
  if (!itemIds?.length) return {};

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
      watchlistResponse.data.map((item) => item.item_id)
    );
    const favoritesSet = new Set(
      favoritesResponse.data.map((item) => item.item_id)
    );
    const ratingsMap = new Map(
      ratingsResponse.data.map((item) => [item.item_id, item.rate])
    );

    const itemsMap = new Map();

    itemIds.forEach((id) => {
      const idString = id.toString();

      if (!itemsMap.has(idString)) {
        itemsMap.set(idString, new Map());
      }

      const itemData = itemsMap.get(idString);

      itemData.set("inWatchlist", watchlistSet.has(idString));
      itemData.set("inFavorites", favoritesSet.has(idString));
      itemData.set("rating", ratingsMap.get(idString) || null);
    });

    return itemsMap;
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
  if (!id || !type || !userId) return {};

  try {
    const [listsResponse, ratingsResponse] = await Promise.all([
      supabase
        .from("items_list")
        .select("list_id")
        .eq("type", type)
        .eq("item_id", id),

      supabase
        .from("rating")
        .select("rate")
        .eq("user_id", userId)
        .eq("type", type)
        .eq("item_id", id),
    ]);

    if (listsResponse.error) throw listsResponse.error;
    if (ratingsResponse.error) throw ratingsResponse.error;

    const listIds = new Set(listsResponse?.data?.map((item) => item.list_id));

    const itemMap = new Map();
    itemMap.set(id, new Map());
    itemMap.get(id).set("inWatchlist", listIds.has(watchlistId));
    itemMap.get(id).set("inFavorites", listIds.has(favoriteListId));
    itemMap.get(id).set("rating", ratingsResponse?.data[0]?.rate || null);
    itemMap
      .get(id)
      .set(
        "remainLists",
        new Set(
          listsResponse?.data?.filter(
            (item) =>
              item.list_id !== watchlistId && item.list_id !== favoriteListId
          )
        )
      );

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
