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

  return { isLoading, lists, error };
}
