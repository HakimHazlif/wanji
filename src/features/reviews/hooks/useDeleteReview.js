import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { deleteReview as deleteReviewApi } from "../api/apiReview";
import { useParams } from "react-router-dom";

export function useDeleteReview() {
  const { uid } = useSelector((state) => state.user.user);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleteReview, isLoading } = useMutation({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["review", id]);
      queryClient.removeQueries(["userReviewsList", uid]);
      queryClient.invalidateQueries(["ratingList", uid]);
      queryClient.invalidateQueries(["shortLists", "reviews", uid]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { deleteReview, isLoading };
}
