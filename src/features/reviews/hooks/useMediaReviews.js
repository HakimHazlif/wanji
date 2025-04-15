import { useSelector } from "react-redux";
import { fetchReviewsList } from "../api/apiReview";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useMediaReviews() {
  const { uid } = useSelector((state) => state.user.user);
  const { id, category } = useParams();

  const { data: usersReview, isLoading } = useQuery({
    queryKey: ["reviewsList", id, category],
    queryFn: () => fetchReviewsList(id, category, uid),
    enabled: uid !== "",
    onError: () => {
      toast.error("Failed to load reviews");
    },
  });

  return { usersReview, isLoading };
}
