import ReviewCard from "../../components/ReviewCard";

const ShowReviews = ({ reviews }) => {
  return (
    <section className="flex flex-col gap-5">
      <div className="mb-6 border-b border-slate-700 pb-3">
        <h2 className="text-4xl font-semibold ">Reviews</h2>
      </div>
      {reviews.map((review) => {
        return <ReviewCard key={review.id} review={review} />;
      })}
    </section>
  );
};

export default ShowReviews;
