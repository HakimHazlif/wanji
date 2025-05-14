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

  const itemIds = useMemo(() => {
    const castMovies = personMovies?.cast ?? [];
    const crewMovies = personMovies?.crew ?? [];
    const castTv = personTv?.cast ?? [];
    const crewTv = personTv?.crew ?? [];

    const moviesIds = [
      ...new Set([...castMovies, ...crewMovies].map((movie) => movie.id)),
    ];
    const tvIds = [...new Set([...castTv, ...crewTv].map((tv) => tv.id))];

    return {
      moviesIds,
      tvIds,
    };
  }, [personMovies?.cast, personMovies?.crew, personTv?.cast, personTv?.crew]);

  const { isLoading: isMovieStatusLoading } = useItemsStatus(
    itemIds.moviesIds,
    "movie"
  );
  const { isLoading: isTvStatusLoading } = useItemsStatus(itemIds.tvIds, "tv");

  return {
    personDetails,
    personImages,
    personMovies,
    personTv,
    isLoading: isPersonLoading || isMovieStatusLoading || isTvStatusLoading,
  };
}
