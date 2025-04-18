import { useMutation, useQueryClient } from "react-query";
import { deleteList as deleteListApi } from "../api/apiUserActions";

export function useDeleteList() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteListApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  return { deleteList, isLoading, error };
}
