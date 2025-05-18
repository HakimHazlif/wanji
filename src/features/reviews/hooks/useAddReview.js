import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { addReview as addReviewApi } from "../api/apiReview";
import { useParams } from "react-router-dom";

export function useAddReview() {
  const { uid } = useSelector((state) => state.user.user);
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { mutate: addReview, isLoading } = useMutation({
    mutationFn: addReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["review", id]);
      queryClient.invalidateQueries(["reviewsList", uid]);
      queryClient.invalidateQueries(["shortLists", "reviews", uid]);

      const userReviews = queryClient.getQueriesData(["userReviewsList", uid]);
      if (userReviews.length < 4)
        queryClient.removeQueries(["userReviewsList", uid]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { addReview, isLoading };
}
