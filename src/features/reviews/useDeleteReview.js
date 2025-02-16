import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { deleteReview as deleteReviewApi } from "../../services/apiReviews";

export function useDeleteReview() {
  const { uid } = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const { mutate: deleteReview, isLoading } = useMutation({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["review"]);
      queryClient.invalidateQueries(["ratingList", uid]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { deleteReview, isLoading };
}
