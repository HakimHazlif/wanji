import { useSelector } from "react-redux";
import { fetchReviewsList } from "../../services/apiReviews";
import { useQuery } from "react-query";

export function useReviewsList() {
  const { uid } = useSelector((state) => state.user.user);

  const { data, isLoading } = useQuery({
    queryKey: ["reviewsList", uid],
    queryFn: () => fetchReviewsList({ userId: uid }),
    onError: (error) => {
      console.log(error);
    },
  });

  const reviewsList = data?.reviews;

  return { reviewsList, isLoading };
}
