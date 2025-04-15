import { useMutation, useQueryClient } from "react-query";
import { deleteVisualMedia as deleteVisualMediaApi } from "../api/apiUserActions";

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
    },
  });

  return { deleteVisualMedia, error, isLoading };
}
