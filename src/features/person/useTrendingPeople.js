import { useQuery } from "react-query";
import { fetchTrendingPeople } from "../../services/apiPeople";

export function useTrendingPeople() {
  const { isLoading, data: trendingPeople } = useQuery({
    queryKey: ["trendingPeople"],
    queryFn: fetchTrendingPeople,
    onError: (err) => {
      console.error(err);
    },
  });

  return { trendingPeople, isLoading };
}
