import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { addReview as addReviewApi } from "../../services/apiReviews";

export function useAddReview() {
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
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { addReview, isLoading };
}
