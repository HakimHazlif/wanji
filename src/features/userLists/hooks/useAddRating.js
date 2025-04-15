import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addRateToVisualMedia } from "../api/apiUserActions";

export function useAddRating(type) {
  const { category, id } = useParams();

  const { uid } = useSelector((state) => state.user.user);

  const queryClient = useQueryClient();

  const { mutate: addRating, isLoading } = useMutation({
    mutationFn: addRateToVisualMedia,
    onSuccess: () => {
      queryClient.invalidateQueries(["rating", category, id, uid]);
      queryClient.invalidateQueries(["ratingList", uid]);
      queryClient.invalidateQueries(["itemsStatus", type]);
      queryClient.invalidateQueries({
        queryKey: ["itemStatus", type],
      });
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { addRating, isLoading };
}
