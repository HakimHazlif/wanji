import { useQuery } from "react-query";
import { getShows } from "../../services/apiShow";

export function useShows() {
  const {
    isLoading,
    data: shows,
    error,
  } = useQuery({
    queryKey: ["shows"],
    queryFn: getShows,
  });

  return { isLoading, shows, error };
}
