import { useQuery } from "react-query";
import { fetchUserReview } from "../../services/apiReviews";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

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
  });

  const userReview = data?.review?.[0] ?? null;

  return { userReview, isLoading };
}
