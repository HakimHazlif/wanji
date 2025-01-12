import { useMutation, useQueryClient } from "react-query";
import { insertShow } from "../../services/apiLists";

export function useAddShow() {
  const queryClient = useQueryClient();

  const {
    mutate: addShow,
    error,
    isLoading,
  } = useMutation({
    mutationFn: insertShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: () => {
      console.log("the adding is failed");
    },
  });

  return { addShow, error, isLoading };
}
