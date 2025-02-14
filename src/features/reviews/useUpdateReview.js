import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { updateReview as updateReviewApi } from "../../services/apiReviews";

export function useUpadetRating() {
  const { uid } = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const { mutate: updateReview, isLoading } = useMutation({
    mutationFn: updateReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["review"]);
      queryClient.invalidateQueries(["ratingList", uid]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { updateReview, isLoading };
}
