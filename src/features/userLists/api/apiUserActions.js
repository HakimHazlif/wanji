import supabase from "../../../services/supabase";

export async function addVisualMedia({
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

export async function deleteVisualMedia({ id, listId, type }) {
  const { error } = await supabase
    .from("items_list")
    .delete()
    .eq("item_id", id)
    .eq("list_id", listId)
    .eq("type", type);

  if (error) throw new Error(error);
}

export async function addRateToVisualMedia({
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

export async function updateVisualMediaRate({ itemId, type, rating, userId }) {
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
  if (newDescription || newDescription === "") {
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
