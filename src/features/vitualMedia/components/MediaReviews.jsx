import { useSelector } from "react-redux";
import { useReview } from "../../reviews/hooks/useReview";
import { useRatingList } from "../../userLists/hooks/useRatingList";
import { useMediaReviews } from "../../reviews/hooks/useMediaReviews";
import { useMemo } from "react";
import Spinner from "../../../ui/Spinner";
import ReviewCard from "../../../components/ReviewCard";
import UserReview from "../../reviews/components/UserReview";

const MediaReviews = ({ reviews, show, category }) => {
  const { username, avatar, uid } = useSelector((state) => state.user.user);
  const { userReview, isLoading: isReviewLoading } = useReview();
  const { usersReview, isLoading: isReviewsLoading } = useMediaReviews();
  const { showRate } = useRatingList();

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
    return usersReview?.map((userReview) => {
      return {
        id: userReview.user_id,
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
  }, [usersReview]);

  const reviewsNumber =
    (usersReview?.length || 0) + reviews?.length + (userReviewData ? 1 : 0);

  // if !uid or reviews?.length === 0 return a reuseable component that invint the user to sign in

  if (isReviewLoading || isReviewsLoading) return <Spinner />;

  return (
    <section className="">
      <div className="mb-6 border-b border-slate-700 pb-3 flex justify-between items-end">
        <h2 className="heading-title-1 font-semibold">Reviews</h2>
        <span className="text-xl text-slate-400 cursor-pointer">
          {reviewsNumber} {reviewsNumber === 1 ? "Review" : "Reviews"}
        </span>
      </div>
      {uid && (
        <div className="mb-20">
          <div className="mb-6">
            <h3 className="heading-title-2 font-semibold ">My Review</h3>
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

      {usersReview?.length > 0 && (
        <div className="mb-14">
          <div className="mb-6">
            <h3 className="heading-title-2 font-semibold ">
              Community Reviews
            </h3>
          </div>
          <div className="grid grid-flow-row gap-3 w-full">
            {usersReviewList?.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })}
          </div>
        </div>
      )}

      {reviews?.length > 0 && (
        <div>
          <div className="mb-6">
            <h3 className="heading-title-2 font-semibold ">
              TMDB Users&apos; Reviews
            </h3>
          </div>
          <div className="grid grid-flow-row gap-3 ">
            {reviews.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaReviews;
