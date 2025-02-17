import { useSelector } from "react-redux";
import { fetchUserReviewsList } from "../../services/apiReviews";
import { useQuery } from "react-query";

export function useUserReviewsList() {
  const { uid } = useSelector((state) => state.user.user);

  const { data, isLoading } = useQuery({
    queryKey: ["userReviewsList", uid],
    queryFn: () => fetchUserReviewsList(uid),
    onError: (error) => {
      console.log(error);
    },
  });

  const reviewsList = data?.reviews;

  return { reviewsList, isLoading };
}
