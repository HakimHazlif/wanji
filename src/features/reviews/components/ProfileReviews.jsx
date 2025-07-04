import { useSelector } from "react-redux";
import EmptyShortList from "../../../components/EmptyShortList";
import ReviewCard from "../../../components/ReviewCard";
import { useMemo } from "react";
import { useUserReviewsList } from "../hooks/useUserReviewsList";
import { useShortList } from "../../userLists/hooks/useShortList";
import Spinner from "../../../ui/Spinner";

const ProfileReviews = () => {
  const { avatar, username } = useSelector((state) => state.user.user);
  const { reviewsList } = useUserReviewsList();

  const shortListData = reviewsList?.slice(0, 4);

  const { shortList: shortReviews, isLoading } = useShortList(
    shortListData,
    "reviews"
  );

  const shortReviewsItems = useMemo(() => {
    return shortReviews?.map((item, index) => ({
      ...item,
      review: reviewsList?.[index]?.review,
      created_at: reviewsList?.[index]?.created_at,
    }));

    // if I would add reviews for episode, should use here mapItemsWithParentId
  }, [shortReviews, reviewsList]);

  const reviewList = useMemo(() => {
    const usersReviewList = shortReviewsItems?.map((review) => {
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
  }, [shortReviewsItems, avatar, username]);

  return (
    <div className="pt-32 mb-10">
      <div>
        <h3 className="text-4xl font-semibold mb-10">My Reviews</h3>
        {isLoading ? (
          <Spinner />
        ) : reviewList?.length > 0 ? (
          <div>
            {reviewList?.map((review, index) => (
              <ReviewCard
                key={index}
                review={review}
                show={shortReviews[index]}
                isUser={true}
                isProfileList={true}
                type={review.type}
              />
            ))}
          </div>
        ) : (
          <EmptyShortList listName="Review" />
        )}
      </div>
    </div>
  );
};

export default ProfileReviews;
