import { useMutation, useQueryClient } from "react-query";
import { updateShowRate } from "../../services/apiLists";
import { useSelector } from "react-redux";

export function useUpadetRating() {
  const { uid } = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const { mutate: updateRating, isLoading } = useMutation({
    mutationFn: updateShowRate,
    onSuccess: () => {
      queryClient.invalidateQueries(["rating"]);
      queryClient.invalidateQueries(["ratingList", uid]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { updateRating, isLoading };
}
