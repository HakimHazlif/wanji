import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getShow } from "../../services/apiShows";

export function useShow() {
  const { category, id } = useParams();

  const { data: show = {}, isLoading } = useQuery({
    queryKey: ["show", category, id],
    queryFn: () => getShow({ category, id }),
    onError: (error) => {
      console.error("Error fetching show:", error.message);
    },
  });

  const details = show.showDetails || null;
  const images = show.showImages || null;
  const credits = show.showCredits || null;
  const similar = show.showSimilar || null;
  const reviews = show.showReviews || null;

  return { show, details, images, credits, similar, reviews, isLoading };
}
