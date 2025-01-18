import { useMutation, useQueryClient } from "react-query";
import { updateShowRate } from "../../services/apiLists";

export function useUpadetRating() {
  const queryClient = useQueryClient();

  const { mutate: updateRating, isLoading } = useMutation({
    mutationFn: updateShowRate,
    onSuccess: () => {
      queryClient.invalidateQueries(["rating"]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { updateRating, isLoading };
}
