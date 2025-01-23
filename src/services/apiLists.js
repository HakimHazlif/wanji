import axios from "axios";
import { options, URL_Base } from "../constants/variables";
import supabase from "./supabase";
import {
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
} from "../features/lists/listsSlice";

export async function getAllUserLists(id) {
  const { data: lists, error } = await supabase
    .from("lists")
    .select(
      `
      id,
      name,
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
  // console.log({ id, listId, type, title, date });
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

export async function deleteShow({ id, listId, parentId = null }) {
  const { error } = await supabase
    .from("items_list")
    .delete()
    .eq("item_id", id)
    .eq("list_id", listId)
    .eq("parent_id", parentId);

  if (error) throw new Error(error);
}

export async function getShowRating({ itemId, type, userId }) {
  const { data: rate, error } = await supabase
    .from("rating")
    .select("rate")
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .eq("type", type);

  if (error) throw new Error(error);

  return rate;
}

export async function addRateToShow({
  itemId,
  type,
  rating,
  userId,
  parentId = null,
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
      },
    ])
    .select();

  return { data, error };
}

export async function updateShowRate({
  itemId,
  type,
  rating,
  userId,
  parentId = null,
}) {
  const { data, error } = await supabase
    .from("rating")
    .update({ rate: rating })
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .eq("type", type)
    .eq(" parent_id", parentId)
    .select("*");

  if (error) throw new Error(error);

  return { data, error };
}

export async function insertNewList({ userId, name, itemId, type }) {
  const listId = crypto.randomUUID();

  if (!userId) throw new Error("Should you sign up or log in to add a list");

  const { data: listData, error: listError } = await supabase
    .from("lists")
    .insert([{ id: listId, user_id: userId, name: name }])
    .select("*")
    .eq("user_id", userId);

  if (listError) throw new Error(listError);

  if (itemId && type) {
    const { data: itemData, error: itemError } = await supabase
      .from("items_list")
      .insert([{ item_id: itemId, list_id: listId, type: type }]);

    if (itemError) throw new Error(itemError);

    return { listData, itemData, error: null };
  }

  return { listData, listError };
}

export async function deleteList({ userId, listId }) {
  if (!userId || !listId) throw new Error("the user_id or list_id is undefind");

  const { error } = await supabase
    .from("lists")
    .delete()
    .eq("id", listId)
    .eq("user_id", userId);

  if (error) throw new Error(error);

  return { error };
}

export async function updateListName({ userId, listId, newName }) {
  if (!userId)
    throw new Error(
      "Should you sign up or log in to update the name of the list"
    );
  if (!listId) throw new Error("the list_id is undefind");
  if (!newName) throw new Error("the new name is undefind");

  const { data, error } = await supabase
    .from("lists")
    .update({ name: newName })
    .eq("id", listId)
    .select("*");

  if (error) throw new Error(error);

  return { data, error };
}

// export async function getShowsList(shows = [], startPoint = 0, type = "movie") {
//   if (!shows) return;
//   const showsUrl = [];

//   shows.slice(startPoint, startPoint + 20).forEach((show) => {
//     if (show.type !== type) return;
//     const url = `${URL_Base}${show.type}/${show.item_id}?language=en-US`;

//     showsUrl.push(url);
//   });
// }

export const fetchItemsList =
  (listId, list, startPoint = 0) =>
  async (dispatch) => {
    if (!list?.length || list?.length < startPoint) return;

    try {
      dispatch(fetchItemsStart());
      const showsUrl = [];

      list.slice(startPoint, startPoint + 20).forEach((show) => {
        let url;
        if (show.type === "movie" || show.type === "tv")
          url = `${URL_Base}${show.type}/${show.item_id}?append_to_response=credits&language=en-US`;
        if (show.type === "episode")
          url = `${URL_Base}tv/${show.parent_id}/season/${show.season_number}/episode/${show.episode_number}?language=en-US`;

        showsUrl.push(url);
      });

      const results = await axios.all(
        showsUrl.map((url) => axios.get(url, options))
      );
      const items = results.map((result) => result.data);

      dispatch(fetchItemsSuccess({ listId, items, list }));
    } catch (err) {
      dispatch(fetchItemsFailure(err));
    }
  };

// export const fetchItem = (listId, item) => async (dispatch) => {
//   const { type, item_id, parent_id, season_number, episode_number } = item;

//   try {
//     dispatch(fetchItemsStart());
//     let url;
//     if (type === "movie" || type === "tv")
//       url = `${URL_Base}${type}/${item_id}?append_to_response=credits&language=en-US`;
//     if (type === "episode")
//       url = `${URL_Base}tv/${parent_id}/season/${season_number}/episode/${episode_number}?language=en-US`;

//     const result = await axios.get(url, options);

//     dispatch(fetchOneItemSuccess({ listId, item: result?.data?.[0] }));
//   } catch (err) {
//     dispatch(fetchItemsFailure(err));
//   }
// };
