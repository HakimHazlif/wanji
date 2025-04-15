import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRatingList } from "../api/apiUserList";

export function useRatingList() {
  const { uid } = useSelector((state) => state.user.user);

  const { data, isLoading } = useQuery({
    queryKey: ["ratingList", uid],
    queryFn: () => getRatingList({ userId: uid }),
    enabled: !!uid,
    onError: () => {
      toast.error("Failed to load ratings");
    },
  });

  const ratingList = data?.rating;

  return { ratingList, isLoading };
}
