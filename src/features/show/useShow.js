import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getShow } from "../../services/apiShows";

export function useShow() {
  const { category, id } = useParams();

  const { data: show, isLoading } = useQuery({
    queryKey: ["show", category, id],
    queryFn: () => getShow({ category, id }),
    onError: (error) => {
      console.error("Error fetching show:", error.message);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const details = show?.showDetails || null;
  const images = show?.showImages || null;
  const credits = show?.showCredits || null;
  const similar = show?.showSimilar || null;
  const reviews = show?.showReviews || null;
  const videos = show?.showVideos || null;

  return {
    show,
    details,
    images,
    credits,
    similar,
    reviews,
    videos,
    isLoading,
  };
}
