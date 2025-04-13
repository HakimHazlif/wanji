import { useQuery } from "react-query";
import { fetchPopularPeople } from "../../services/apiPeople";

export function usePopularPeople() {
  const { isLoading, data: popularPeople } = useQuery({
    queryKey: ["popularPeople"],
    queryFn: fetchPopularPeople,
    onError: (err) => {
      console.error(err);
    },
  });

  return { popularPeople, isLoading };
}
