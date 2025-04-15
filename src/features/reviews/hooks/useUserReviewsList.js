import { useSelector } from "react-redux";
import { fetchUserReviewsList } from "../api/apiReview";
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
  });

  const reviewsList = data?.reviews;

  return { reviewsList, isLoading };
}
