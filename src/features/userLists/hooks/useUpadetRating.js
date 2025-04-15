import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { updateVisualMediaRate } from "../api/apiUserActions";

export function useUpadetRating(type) {
  const { uid } = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const { mutate: updateRating, isLoading } = useMutation({
    mutationFn: updateVisualMediaRate,
    onSuccess: () => {
      queryClient.invalidateQueries(["rating"]);
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

  return { updateRating, isLoading };
}
