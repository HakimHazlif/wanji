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
    .select("*");

  console.log(data);

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

export const fetchItemsList = async (listId, list, startPoint = 0) => {
  if (!list?.length || list?.length <= startPoint) {
    return { items: [], listId, nextPoint: null };
  }

  const showsUrl = list.slice(startPoint, startPoint + 20).map((show) => {
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
