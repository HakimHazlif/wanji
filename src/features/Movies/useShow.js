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
  });

  return { isLoading, show, error };
}
