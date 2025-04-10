import { useQuery } from "react-query";
import { fetchUserReview } from "../../services/apiReviews";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useReview() {
  const { uid } = useSelector((state) => state.user.user);
  const { id, category } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: () => fetchUserReview(uid, id, category),
    enabled: uid !== "",
    onError: (err) => {
      throw new Error(err.message);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const userReview = data?.review?.[0] ?? null;

  return { userReview, isLoading };
}
