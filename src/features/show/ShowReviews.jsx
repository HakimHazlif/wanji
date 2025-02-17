import { useMemo } from "react";
import ReviewCard from "../../components/ReviewCard";
import { useReview } from "../reviews/useReview";
import { useSelector } from "react-redux";
import { useRating } from "../lists/useRating";
import UserReview from "../reviews/UserReview";
import { useShowReviews } from "../reviews/useShowReviews";
import Spinner from "../../ui/Spinner";

const ShowReviews = ({ reviews, show, category }) => {
  const { username, avatar, uid } = useSelector((state) => state.user.user);
  const { userReview, isLoading: isReviewLoading } = useReview();
  const { usersReview, isLoading: isReviewsLoading } = useShowReviews();
  const { showRate } = useRating();

  const userReviewData = useMemo(() => {
    if (userReview && userReview?.item_id && username) {
      return {
        author: username,
        author_details: { avatar_path: avatar, rating: showRate },
        content: userReview?.review,
        created_at: userReview?.created_at,
        url: null,
      };
    }

    return null;
  }, [avatar, showRate, userReview, username]);

  const usersReviewList = useMemo(() => {
    const usersReviewList = usersReview?.map((userReview) => {
      return {
        author: userReview.username,
        author_details: {
          avatar_path: userReview.avatar,
          rating: userReview.rate,
        },
        content: userReview?.review,
        created_at: userReview?.created_at,
        url: null,
      };
    });

    return usersReviewList;
  }, [usersReview]);

  // if !uid or reviews?.length === 0 return a reuseable component that invint the user to sign in

  if (isReviewLoading || isReviewsLoading) return <Spinner />;

  return (
    <section className="">
      <div className="mb-6 border-b border-slate-700 pb-3">
        <h2 className="text-4xl font-semibold">Reviews</h2>
      </div>
      {uid && (
        <div className="mb-14">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold ">My Reviews</h3>
          </div>
          {userReviewData ? (
            <ReviewCard
              review={userReviewData}
              isUser={true}
              show={show}
              type={category}
            />
          ) : (
            <UserReview show={show} type={category} />
          )}
        </div>
      )}

      {usersReview.length > 0 && (
        <div className="mb-14">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold ">Community Reviews</h3>
          </div>
          <div className="grid grid-flow-row gap-3">
            {usersReviewList.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })}
          </div>
        </div>
      )}

      {reviews?.length > 0 && (
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold ">
              TMDB Users&apos; Reviews
            </h3>
          </div>
          <div className="grid grid-flow-row gap-3">
            {reviews.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowReviews;
