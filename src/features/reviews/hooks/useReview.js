import { useQuery } from "react-query";
import { fetchUserReview } from "../api/apiReview";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useReview() {
  const { uid } = useSelector((state) => state.user.user);
  const { id, category } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchUserReview(uid, id, category),
    enabled: uid !== "",
    onError: () => {
      throw new Error("Failed to load user review");
    },
  });

  const userReview = data?.review?.[0] ?? null;

  return { userReview, isLoading };
}
