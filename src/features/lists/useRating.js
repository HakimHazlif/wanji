import { useQuery } from "react-query";
import { getShowRating } from "../../services/apiLists";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function useRating(type = null, itemId = null) {
  const { category, id } = useParams();
  const { uid } = useSelector((state) => state.user.user);

  const updatedId = type === "episode" ? itemId : id;
  const updateType = type === "episode" ? type : category;

  const item = {
    itemId: updatedId,
    type: updateType,
    userId: uid,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["rating", updateType, updatedId, uid],
    queryFn: () => getShowRating(item),
    enabled: uid !== "",
    onError: (err) => {
      throw new Error(err);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const showRate = data?.[0]?.rate ?? null;

  return { showRate, isLoading };
}
