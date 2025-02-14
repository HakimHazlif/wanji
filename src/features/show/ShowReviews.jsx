import { useMemo } from "react";
import ReviewCard from "../../components/ReviewCard";
import { useRatingList } from "../lists/useRatingList";
import UserAvatar from "../../ui/UserAvatar";
import { useReview } from "../reviews/useReview";
import { useSelector } from "react-redux";
import { useRating } from "../lists/useRating";

const ShowReviews = ({ reviews, itemId, type }) => {
  const { username, avatar } = useSelector((state) => state.user.user);
  const { review } = useReview();
  const { rating } = useRating();

  const userReviews = useMemo(() => {
    if (review && review.item_id && username) {
      return {
        author: username,
        author_details: { avatar_path: avatar, rating },
        content: review?.review,
        created_at: review?.created_at,
        url: null,
      };
    }

    return null;
  }, [avatar, rating, review, username]);

  return (
    <section className="flex flex-col gap-5">
      <div className="mb-6 border-b border-slate-700 pb-3">
        <h2 className="text-4xl font-semibold ">Reviews</h2>
      </div>
      <div>
        {userReviews ? (
          <ReviewCard review={userReviews} />
        ) : (
          <div className="flex gap-5">
            <UserAvatar size="w-32 h-28" />
            <div className="w-full">
              <label htmlFor="user-review" className="hidden"></label>
              <textarea
                name=""
                id=""
                className="w-full px-4 py-2 bg-bluish-black border outline-none rounded-lg shadow-sm focus:ring-2 focus:ring-orange-coral focus:border-transparent transition-colors"
                placeholder={`Add your review for this ${
                  type === "tv" ? "TV show" : type
                } here...`}
                rows={4}
              ></textarea>
            </div>
          </div>
        )}
      </div>
      {reviews.map((review) => {
        return <ReviewCard key={review.id} review={review} />;
      })}
    </section>
  );
};

export default ShowReviews;
