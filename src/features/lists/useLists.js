import { useQuery } from "react-query";
import { getAllUserLists } from "../../services/apiLists";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { useMemo } from "react";

export function useLists() {
  const { uid } = useSelector((state) => state.user.user);

  const {
    isLoading,
    data: lists,
    error,
  } = useQuery({
    queryKey: ["lists", uid],
    queryFn: () => uid && getAllUserLists(uid),

    refetchOnMount: true,
  });

  const userLists = useMemo(() => {
    return {
      watchlist: lists
        ? lists.filter((item) => item.name === "watchlist")[0]
        : null,
      favoriteList: lists
        ? lists.filter((item) => item.name === "favorite")[0]
        : null,
      remainLists: lists
        ? lists.filter(
            (item) =>
              item.name !== "watchlist" &&
              item.name !== "favorite" &&
              item.name !== "rated"
          )
        : null,
    };
  }, [lists]);

  return {
    isLoading,
    lists,
    remainLists: userLists.remainLists,
    watchlist: useLists.watchlist,
    favoriteList: userLists.favoriteList,
    error,
  };
}
