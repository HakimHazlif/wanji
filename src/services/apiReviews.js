import supabase from "./supabase";

export async function fetchUserReviewsList(userId) {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return { reviews };
}

export async function fetchReviewsList(itemId, type, userId) {
  const { data: reviewsList, error: reviewsError } = await supabase
    .from("reviews")
    .select("*")
    .eq("item_id", itemId)
    .eq("type", type)
    .neq("user_id", userId);

  if (reviewsError) console.error(reviewsError);

  const userIds = reviewsList.map((review) => review.user_id);

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")
    .in("id", userIds);

  if (profilesError) console.error(profilesError);

  const userMap = new Map(
    profiles.map((user) => [
      user.id,
      {
        username: user.username,
        avatar: user.avatar,
      },
    ])
  );

  const { data: ratings, error: ratingsError } = await supabase
    .from("rating")
    .select("user_id, rate")
    .eq("item_id", itemId)
    .eq("type", type)
    .in("user_id", userIds);

  if (ratingsError) console.error(ratingsError);

  const ratingMap = new Map(ratings.map((r) => [r.user_id, r.rate]));

  const reviews = reviewsList.map((review) => ({
    ...review,
    username: userMap.get(review.user_id)?.username || "Unknown",
    avatar: userMap.get(review.user_id)?.avatar || null,
    rate: ratingMap.get(review.user_id) || null,
  }));

  return reviews;
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
