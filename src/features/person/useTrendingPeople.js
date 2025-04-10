import { useQuery } from "react-query";
import { fetchTrendingPeople } from "../../services/apiPeople";

export function useTrendingPeople() {
  const { isLoading, data: trendingPeople } = useQuery({
    queryKey: ["trendingPeople"],
    queryFn: fetchTrendingPeople,
    onError: (err) => {
      console.error(err);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { trendingPeople, isLoading };
}
