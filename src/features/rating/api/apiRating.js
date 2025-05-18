import supabase from "../../../services/supabase";

export async function getRatingAverage(itemId, type) {
  if (!itemId && !type) return;

  const { data, error } = await supabase.rpc("get_average_rating", {
    media_id_input: itemId,
    media_type_input: type,
  });

  if (error) throw new Error(error.message);

  return data[0];
}

export async function getRatingAverageForItems(items) {
  if (!items || !items.length) return;

  const { data, error } = await supabase.rpc("get_ratings_for_items", {
    input_items: items,
  });

  if (error) throw new Error(error.message);

  const dataMaps = new Map();

  data.forEach((item) => {
    dataMaps.set(item.item_id, item);
  });

  return dataMaps;
}
