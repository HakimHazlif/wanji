import { useSelector } from "react-redux";
import { fetchReviewsList } from "../../services/apiReviews";
import { useQuery } from "react-query";
import { useParams } from "react-router";

export function useShowReviews() {
  const { uid } = useSelector((state) => state.user.user);
  const { id, category } = useParams();

  const { data: usersReview, isLoading } = useQuery({
    queryKey: ["reviewsList", id, category],
    queryFn: () => fetchReviewsList(id, category, uid),
    enabled: uid !== "",
    onError: (error) => {
      console.log(error);
    },
  });

  return { usersReview, isLoading };
}
