import { useQuery } from "react-query";
import { fetchPopularPeople } from "../../services/apiPeople";

export function usePopularPeople() {
  const { isLoading, data: popularPeople } = useQuery({
    queryKey: ["popularPeople"],
    queryFn: fetchPopularPeople,
    onError: (err) => {
      console.error(err);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { popularPeople, isLoading };
}
