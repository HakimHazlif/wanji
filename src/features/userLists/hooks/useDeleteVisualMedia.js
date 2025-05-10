import { useMutation, useQueryClient } from "react-query";
import { deleteVisualMedia as deleteVisualMediaApi } from "../api/apiUserActions";
import toast from "react-hot-toast";

export function useDeleteVisualMedia(type) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteVisualMedia,
    error,
    isLoading,
  } = useMutation({
    mutationFn: deleteVisualMediaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({
        queryKey: ["itemsStatus", type],
      });
      queryClient.invalidateQueries({
        queryKey: ["itemStatus", type],
      });

      toast.success(`This ${type} has been deleted successfully`);
    },
    onError: () => {
      toast.error(`Failed to delete this ${type}`);
    },
  });

  return { deleteVisualMedia, error, isLoading };
}
