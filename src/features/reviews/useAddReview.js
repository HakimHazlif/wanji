import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { addReview as addReviewApi } from "../../services/apiReviews";

export function useAddRating() {
  const { uid } = useSelector((state) => state.user.user);

  const queryClient = useQueryClient();

  const { mutate: addReview, isLoading } = useMutation({
    mutationFn: addReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["review"]);
      queryClient.invalidateQueries(["reviewsList", uid]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { addReview, isLoading };
}
