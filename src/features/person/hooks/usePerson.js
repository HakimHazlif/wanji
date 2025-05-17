import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPersonData } from "../api/personApi";
import { useItemsStatus } from "../../userLists/hooks/useItemsStatus";
import { useMemo } from "react";

export function usePerson() {
  const { personId } = useParams();

  const { isLoading: isPersonLoading, data: personData } = useQuery({
    queryKey: ["person", personId],
    queryFn: () => getPersonData(personId),
    onError: (err) => {
      console.error(err);
    },
  });

  const personDetails = personData?.personDetails;
  const personMovies = personData?.movieCredits;
  const personTv = personData?.tvCredits;
  const personImages = personData?.images;

  const movies = useMemo(() => {
    const castMovies = personMovies?.cast ?? [];
    const crewMovies = personMovies?.crew ?? [];

    const crewMap = new Map(crewMovies.map((movie) => [movie?.id, movie]));

    return castMovies.map((movie) => ({
      ...movie,
      department: crewMap.has(movie?.id)
        ? ["Acting", crewMap.get(movie?.id)?.department]
        : ["Acting"],
      job: crewMap.has(movie?.id) ? crewMap.get(movie?.id)?.job : "",
    }));
  }, [personMovies?.cast, personMovies?.crew]);

  const tvShows = useMemo(() => {
    const castTv = personTv?.cast ?? [];
    const crewTv = personTv?.crew ?? [];

    const crewMap = new Map(crewTv.map((tv) => [tv?.id, tv]));

    return castTv.map((tv) => ({
      ...tv,
      department: crewMap.has(tv?.id)
        ? ["Acting", crewMap.get(tv?.id)?.department]
        : ["Acting"],
      job: crewMap.has(tv?.id) ? crewMap.get(tv?.id)?.job : "",
      episodesAsCast: tv.episode_count,
      episodesAsCrew: crewMap.has(tv?.id)
        ? crewMap.get(tv?.id)?.episode_count
        : 0,
    }));
  }, [personTv?.cast, personTv?.crew]);

  const itemIds = useMemo(() => {
    const moviesIds = [...new Set([...movies].map((movie) => movie.id))];
    const tvIds = [...new Set([...tvShows].map((tv) => tv.id))];

    return {
      moviesIds,
      tvIds,
    };
  }, [movies, tvShows]);

  const { isLoading: isMovieStatusLoading } = useItemsStatus(
    itemIds?.moviesIds,
    "movie"
  );
  const { isLoading: isTvStatusLoading } = useItemsStatus(itemIds?.tvIds, "tv");

  return {
    personDetails,
    personImages,
    personMovies,
    personTv,
    isLoading: isPersonLoading || isMovieStatusLoading || isTvStatusLoading,
    movies,
    tvShows,
  };
}
