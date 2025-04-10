import { useMutation, useQueryClient } from "react-query";
import { insertNewList } from "../../services/apiLists";

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
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { creatList, isLoading, error };
}
