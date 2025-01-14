import { useQuery } from "react-query";
import { getShow } from "../../services/apiShows";

export function useShow(isMovie, showId) {
  const {
    data: show,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["show", isMovie, showId],
    queryFn: () => getShow({ isMovie, showId }),
  });
  if (error) throw new Error(error);

  const details = show?.showDetails || null;
  const images = show?.showImages || null;
  const credits = show?.showCredits || null;
  const similar = show?.showSimilar || null;
  const reviews = show?.showReviews || null;

  return { show, details, images, credits, similar, reviews, isLoading };
}
