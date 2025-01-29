import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getRatingList } from "../../services/apiLists";

export function useRatingList() {
  const { uid } = useSelector((state) => state.user.user);

  const { data: ratingList, isLoading } = useQuery({
    queryKey: ["ratingList", uid],
    queryFn: () => getRatingList({ userId: uid }),
    onError: (error) => {
      console.log(error);
    },
  });

  // console.log(ratingList);

  return { ratingList, isLoading };
}
