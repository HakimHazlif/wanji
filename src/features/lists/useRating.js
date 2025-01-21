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
    onError: (err) => {
      throw new Error(err);
    },
  });

  const showRate = data?.[0]?.rate ?? null;
  if (showRate) console.log(showRate);

  return { showRate, isLoading };
}
