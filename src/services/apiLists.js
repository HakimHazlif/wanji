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
        created_at
      )
    `
    )
    .eq("user_id", id);

  if (error) throw new Error(error);

  return lists;
}

export async function insertShow({ id, listId }) {
  console.log(id, listId);
  const { data, error } = await supabase
    .from("items_list")
    .insert([{ item_id: id, list_id: listId }]);

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteShow({ id, listId }) {
  const { error } = await supabase
    .from("items_list")
    .delete()
    .eq("item_id", id)
    .eq("list_id", listId);

  if (error) throw new Error(error);
}
