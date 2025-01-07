import { useQuery } from "react-query";
import { getTvShows } from "../../services/apiShows";

export function useTvShows() {
  const {
    data: tvShows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tvShows"],
    queryFn: getTvShows,
  });

  return { isLoading, error, tvShows };
}
