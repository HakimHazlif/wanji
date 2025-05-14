import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { clearAllItemsFromList } from "../api/apiUserList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useClearList() {
  const { uid } = useSelector((state) => state.user.user);
  const { listId } = useParams;
  const queryClient = useQueryClient();

  const { mutate: clearList, isLoading } = useMutation({
    mutationFn: clearAllItemsFromList,
    enabled: !!uid && !!listId,
    onSuccess: () => {
      queryClient.invalidateQueries(["lists", uid]);
      queryClient.invalidateQueries(["itemsList", listId]);

      toast.success(`This list has been cleared successfully`);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { clearList, isLoading };
}
