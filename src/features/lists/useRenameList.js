import { useMutation, useQueryClient } from "react-query";
import { updateListName } from "../../services/apiLists";

export function useCreateList() {
  const queryClient = useQueryClient();

  const {
    mutate: renameList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateListName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  return { renameList, isLoading, error };
}
