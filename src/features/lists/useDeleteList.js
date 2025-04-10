import { useMutation, useQueryClient } from "react-query";
import { deleteList as deleteListApi } from "../../services/apiLists";

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
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { deleteList, isLoading, error };
}
