import { useMutation, useQueryClient } from "react-query";
import { addRateToShow } from "../../services/apiLists";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useAddRating(type) {
  const { category, id } = useParams();

  const { uid } = useSelector((state) => state.user.user);

  const queryClient = useQueryClient();

  const { mutate: addRating, isLoading } = useMutation({
    mutationFn: addRateToShow,
    onSuccess: () => {
      queryClient.invalidateQueries(["rating", category, id, uid]);
      queryClient.invalidateQueries(["ratingList", uid]);
      queryClient.invalidateQueries(["itemsStatus", type]);
      queryClient.invalidateQueries({
        queryKey: ["itemStatus", type],
      });
    },
    onError: (err) => {
      throw new Error(err);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { addRating, isLoading };
}
