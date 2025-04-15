import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { getAllUserLists } from "../api/apiUserList";

export function useLists() {
  const { uid } = useSelector((state) => state.user.user);

  const {
    isLoading,
    data: lists,
    error,
  } = useQuery({
    queryKey: ["lists", uid],
    queryFn: () => getAllUserLists(uid),
    enabled: !!uid,
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
            (item) => item.name !== "watchlist" && item.name !== "favorite"
          )
        : null,
    };
  }, [lists]);

  return {
    isLoading,
    lists,
    remainLists: userLists.remainLists,
    watchlist: userLists.watchlist,
    favoriteList: userLists.favoriteList,
    error,
  };
}
