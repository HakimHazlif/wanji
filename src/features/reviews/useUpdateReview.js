import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { updateReview as updateReviewApi } from "../../services/apiReviews";

export function useUpdateReview() {
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
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { updateReview, isLoading };
}
