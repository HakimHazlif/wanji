import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { addVisualMedia as addVisualMediaApi } from "../api/apiUserActions";

export function useAddVisualMedia(type) {
  const queryClient = useQueryClient();

  const {
    mutate: addVisualMedia,
    error,
    isLoading,
  } = useMutation({
    mutationFn: addVisualMediaApi,
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
  });

  return { addVisualMedia, error, isLoading };
}
