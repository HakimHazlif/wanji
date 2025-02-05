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
  });

  return { renameList, isLoading, error };
}
