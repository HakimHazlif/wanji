import supabase from "./supabase";

export async function fetchReviewsList(userId) {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return { reviews };
}

export async function fetchUserReview(userId, itemId, type) {
  const { data: review, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .eq("type", type);

  if (error) throw new Error(error.message);

  return { review };
}

export async function addReview({
  itemId,
  type,
  review,
  userId,
  parentId = null,
  season = null,
  episode = null,
  watchedDate,
  rewatchedDates,
  hasSpoiler,
}) {
  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        item_id: itemId,
        type,
        user_id: userId,
        review,
        parent_id: parentId,
        season_number: season,
        episode_number: episode,
        watched_date: watchedDate,
        rewatched_dates: rewatchedDates,
        has_spoiler: hasSpoiler,
      },
    ])
    .select("*");

  if (error) throw new Error(error);

  return { data };
}

export async function updateReview({
  itemId,
  type,
  review,
  userId,
  watchedDate,
  rewatchedDates,
  hasSpoiler,
}) {
  const { data, error } = await supabase
    .from("reviews")
    .update({
      review: review,
      watched_date: watchedDate,
      rewatched_dates: rewatchedDates,
      has_spoiler: hasSpoiler,
    })
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .eq("type", type)
    .select("*");

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteReview({ itemId, type, userId }) {
  const { data, error } = await supabase
    .from("reviews")
    .delete()
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .eq("type", type);

  if (error) throw new Error(error);

  return { data, error };
}
