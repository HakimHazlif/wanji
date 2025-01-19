import supabase from "./supabase";

export async function getAllUserLists(id) {
  const { data: lists, error } = await supabase
    .from("lists")
    .select(
      `
      id,
      name,
      items_list (
        list_id,
        item_id,
        created_at,
        type, 
        parent_id
      )
    `
    )
    .eq("user_id", id);

  if (error) throw new Error(error);

  return lists;
}

export async function insertShow({ id, listId, type, parentId = null }) {
  // console.log({ id, listId, type, parentId });
  const { data, error } = await supabase
    .from("items_list")
    .insert([
      { item_id: id, list_id: listId, type: type, parent_id: parentId },
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
