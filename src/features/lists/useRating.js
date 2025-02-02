import { useQuery } from "react-query";
import { getShowRating } from "../../services/apiLists";
import { useParams } from "react-router";
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
    onError: (err) => {
      throw new Error(err);
    },
  });

  const showRate = data?.[0]?.rate ?? null;

  return { showRate, isLoading };
}
