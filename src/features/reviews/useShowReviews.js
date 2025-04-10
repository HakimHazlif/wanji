import { useSelector } from "react-redux";
import { fetchReviewsList } from "../../services/apiReviews";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useShowReviews() {
  const { uid } = useSelector((state) => state.user.user);
  const { id, category } = useParams();

  const { data: usersReview, isLoading } = useQuery({
    queryKey: ["reviewsList", id, category],
    queryFn: () => fetchReviewsList(id, category, uid),
    enabled: uid !== "",
    onError: () => {
      toast.error("Failed to load reviews");
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { usersReview, isLoading };
}
