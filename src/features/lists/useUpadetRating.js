import { useMutation, useQueryClient } from "react-query";
import { updateShowRate } from "../../services/apiLists";
import { useSelector } from "react-redux";

export function useUpadetRating(type) {
  const { uid } = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const { mutate: updateRating, isLoading } = useMutation({
    mutationFn: updateShowRate,
    onSuccess: () => {
      queryClient.invalidateQueries(["rating"]);
      queryClient.invalidateQueries(["ratingList", uid]);
      queryClient.invalidateQueries(["itemsStatus", type]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { updateRating, isLoading };
}
