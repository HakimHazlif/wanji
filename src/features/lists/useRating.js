import { useQuery } from "react-query";
import { getShowRating } from "../../services/apiLists";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export function useRating() {
  const { category, id } = useParams();
  const { uid } = useSelector((state) => state.user.user);

  const { data, isLoading } = useQuery({
    queryKey: ["rating", category, id, uid],
    queryFn: () => getShowRating({ itemId: id, type: category, userId: uid }),
    enabled: Boolean(id && category && uid),
    retry: false,
    onError: (err) => {
      throw new Error(err);
    },
  });

  const showRate = data?.rate?.[0] ?? null;

  return { showRate, isLoading };
}
