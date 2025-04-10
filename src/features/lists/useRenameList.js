import { useMutation, useQueryClient } from "react-query";
import { updateList } from "../../services/apiLists";

export function useRenameList() {
  const queryClient = useQueryClient();

  const {
    mutate: renameList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { renameList, isLoading, error };
}
