import { useQuery } from "react-query";
import { getAllUserLists } from "../../services/apiLists";
import { useSelector } from "react-redux";

export function useLists() {
  const { uid } = useSelector((state) => state.user.user);

  const {
    isLoading,
    data: lists,
    error,
  } = useQuery({
    queryKey: ["lists", uid],
    queryFn: () => uid && getAllUserLists(uid),
  });

  const watchlist = lists
    ? lists.filter((item) => item.name === "watchlist")[0]
    : null;
  const favoriteList = lists
    ? lists.filter((item) => item.name === "favorite")[0]
    : null;

  return { isLoading, lists, watchlist, favoriteList, error };
}
