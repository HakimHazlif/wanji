import { useMutation, useQueryClient } from "react-query";
import { deleteShow as apiDeleteShow } from "../../services/apiLists";

export function useDeleteShow() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteShow,
    error,
    isLoading,
  } = useMutation({
    mutationFn: apiDeleteShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  return { deleteShow, error, isLoading };
}
