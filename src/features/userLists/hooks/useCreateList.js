import { useMutation, useQueryClient } from "react-query";
import { insertNewList } from "../api/apiUserActions";

export function useCreateList() {
  const queryClient = useQueryClient();

  const {
    mutate: creatList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: insertNewList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  return { creatList, isLoading, error };
}
