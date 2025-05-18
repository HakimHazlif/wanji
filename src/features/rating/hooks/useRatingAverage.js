import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRatingAverage } from "../api/apiRating";

export function useRatingAverage(type = "") {
  const { id, category } = useParams();

  const realType = type ? type : category;

  const { data: mediaAverage, isLoading } = useQuery({
    queryKey: ["rating-average", id, realType],
    queryFn: () => getRatingAverage(id, realType),
    enabled: !!id && !!realType,
    staleTime: 10 * 60 * 1000,
  });

  return { mediaAverage, isLoading };
}
