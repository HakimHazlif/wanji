import { useSelector } from "react-redux";
import { fetchUserReviewsList } from "../../services/apiReviews";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

export function useUserReviewsList() {
  const { uid } = useSelector((state) => state.user.user);

  const { data, isLoading } = useQuery({
    queryKey: ["userReviewsList", uid],
    queryFn: () => fetchUserReviewsList(uid),
    onError: () => {
      toast.error("Failed to load user review");
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const reviewsList = data?.reviews;

  return { reviewsList, isLoading };
}
