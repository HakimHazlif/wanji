import { useQuery } from "react-query";
import { fetchPeople } from "../api/personApi";

export function usePeople() {
  const { isLoading, data } = useQuery({
    queryKey: ["people"],
    queryFn: fetchPeople,
    onError: (err) => {
      console.error(err);
    },
  });

  const popularPeople = data?.popularPeopleList ?? [];
  const trendingPeople = data?.trendingPeopleList ?? [];

  return { popularPeople, trendingPeople, isLoading };
}
