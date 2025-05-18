import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { updateReview as updateReviewApi } from "../api/apiReview";
import { useParams } from "react-router-dom";

export function useUpdateReview() {
  const { uid } = useSelector((state) => state.user.user);
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { mutate: updateReview, isLoading } = useMutation({
    mutationFn: updateReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["review", id]);
      queryClient.invalidateQueries(["userReviewsList", uid]);
      queryClient.invalidateQueries(["ratingList", uid]);
      queryClient.invalidateQueries(["shortLists", "reviews", uid]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { updateReview, isLoading };
}
