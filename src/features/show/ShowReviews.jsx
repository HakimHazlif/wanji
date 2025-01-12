import ReviewCard from "../components/ReviewCard";
import { useSelector } from "react-redux";
import { showReviews } from "../data/movieSlice";

const ShowReviews = () => {
  const reviews = useSelector(showReviews);

  return (
    <section className="flex flex-col gap-5">
      {reviews.map((review) => {
        return (
          <ReviewCard
            key={review.id}
            author={review.author}
            avatar={review.author_details.avatar_path}
            rating={review.author_details.rating}
            content={review.content}
            date={review.created_at}
          />
        );
      })}
    </section>
  );
};

export default ShowReviews;
