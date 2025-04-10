import { useQuery } from "react-query";
import { getShow } from "../../services/apiShow";

export function useShows() {
  const {
    isLoading,
    data: show,
    error,
  } = useQuery({
    queryKey: ["show"],
    queryFn: getShow,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { isLoading, show, error };
}
