import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getVitualMedia } from "../api/apiMedia";

export function useVitualMedia() {
  const { category, id } = useParams();

  const { data: media, isLoading } = useQuery({
    queryKey: ["media", category, id],
    queryFn: () => getVitualMedia({ category, id }),
    onError: (error) => {
      console.error("Error fetching media:", error.message);
    },
  });

  const details = media?.mediaDetails || null;
  const images = media?.mediaImages || null;
  const credits = media?.mediaCredits || null;
  const similar = media?.mediaSimilar || null;
  const reviews = media?.mediaReviews || null;
  const videos = media?.mediaVideos || null;

  return {
    media,
    details,
    images,
    credits,
    similar,
    reviews,
    videos,
    isLoading,
  };
}
