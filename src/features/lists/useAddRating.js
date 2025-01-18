import { useMutation, useQueryClient } from "react-query";
import { addRateToShow } from "../../services/apiLists";

export function useAddRating() {
  const queryClient = useQueryClient();

  const { mutate: addRating, isLoading } = useMutation({
    mutationFn: addRateToShow,
    onSuccess: () => {
      queryClient.invalidateQueries(["rating"]);
    },
    onError: (err) => {
      throw new Error(err);
    },
  });

  return { addRating, isLoading };
}
