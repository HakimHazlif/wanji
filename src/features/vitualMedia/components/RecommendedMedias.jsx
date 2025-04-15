import ListGrid from "../../../ui/ListGrid";
import MediaCard from "../../../ui/MediaCard";
import { useRecommendedMedia } from "../hooks/useRecommededMedia";
import Spinner from "../../../ui/Spinner";
import { useMemo } from "react";
import { useItemsStatus } from "../../userLists/hooks/useItemsStatus";

const RecommendedMedias = () => {
  const { isLoading, recommendedMovies, recommendedTvShows } =
    useRecommendedMedia();

  const recommendedIds = useMemo(() => {
    const moviesIds = recommendedMovies?.map((item) => item.id);
    const showsIds = recommendedTvShows?.map((item) => item.id);

    return { moviesIds, showsIds };
  }, [recommendedMovies, recommendedTvShows]);

  const { isLoading: isFeaturesLoading1 } = useItemsStatus(
    recommendedIds?.moviesIds?.length ? recommendedIds?.moviesIds : null,
    "movie"
  );
  const { isLoading: isFeaturesLoading2 } = useItemsStatus(
    recommendedIds?.showsIds?.length ? recommendedIds?.showsIds : null,
    "tv"
  );

  if (isLoading || isFeaturesLoading1 || isFeaturesLoading2) return <Spinner />;

  return (
    <section
      className={`flex flex-col gap-20 padding-x ${
        recommendedMovies?.length || recommendedTvShows?.length ? "pt-28" : ""
      }`}
    >
      {recommendedMovies?.length > 0 && (
        <ListGrid
          title="Recommended Movies"
          path="/movies?movies-tag=for_you&page=1"
        >
          {recommendedMovies?.map((movie) => (
            <MediaCard key={movie.id} show={movie} category="movie" />
          ))}
        </ListGrid>
      )}
      {recommendedTvShows?.length > 0 && (
        <ListGrid
          title="Recommended TV Shows"
          path="/tv-shows?tv-tag=for_you&page=1"
        >
          {recommendedTvShows?.map((tv) => (
            <MediaCard key={tv.id} show={tv} category="tv" />
          ))}
        </ListGrid>
      )}
    </section>
  );
};

export default RecommendedMedias;
