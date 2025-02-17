import { useSelector } from "react-redux";
import EmptyShortList from "../../components/EmptyShortList";
import ReviewCard from "../../components/ReviewCard";
import { useMemo } from "react";

const ProfileReviews = ({ reviews }) => {
  console.log(reviews);
  const { avatar, username } = useSelector((state) => state.user.user);

  const reviewList = useMemo(() => {
    const usersReviewList = reviews?.map((review) => {
      return {
        itemId: review.id,
        author: username,
        author_details: {
          avatar_path: avatar,
          rating: null,
        },
        content: review.review,
        created_at: review.created_at,
        posterPath: review.poster_path,
        title: review?.title || review?.name,
        type: review?.title ? "movie" : "tv",
        url: null,
      };
    });

    return usersReviewList;
  }, [reviews, avatar, username]);

  return (
    <div className="pt-32 mb-10">
      <h3 className="text-4xl font-semibold mb-10">My Reviews</h3>
      {reviewList?.length > 0 ? (
        <div>
          {reviewList?.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
              isProfileList={true}
              type={review.type}
            />
          ))}
        </div>
      ) : (
        <EmptyShortList listNmae="Review"></EmptyShortList>
      )}
    </div>
  );
};

export default ProfileReviews;
