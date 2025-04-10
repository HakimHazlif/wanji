import { useMutation, useQueryClient } from "react-query";
import { insertShow } from "../../services/apiLists";
import toast from "react-hot-toast";

export function useAddShow(type) {
  const queryClient = useQueryClient();

  const {
    mutate: addShow,
    error,
    isLoading,
  } = useMutation({
    mutationFn: insertShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({
        queryKey: ["itemsStatus", type],
      });
      queryClient.invalidateQueries({
        queryKey: ["itemStatus", type],
      });
      toast.success(`This ${type} has been added successfully`);
    },
    onError: () => {
      toast.error(`Failed to add this ${type}`);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { addShow, error, isLoading };
}
