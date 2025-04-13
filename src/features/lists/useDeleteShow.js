import { useMutation, useQueryClient } from "react-query";
import { deleteShow as apiDeleteShow } from "../../services/apiLists";

export function useDeleteShow(type) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteShow,
    error,
    isLoading,
  } = useMutation({
    mutationFn: apiDeleteShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({
        queryKey: ["itemsStatus", type],
      });
      queryClient.invalidateQueries({
        queryKey: ["itemStatus", type],
      });
    },
  });

  return { deleteShow, error, isLoading };
}
