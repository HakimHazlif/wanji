import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPersonData } from "../../services/apiShows";

export function usePerson() {
  const { personId } = useParams();

  const { isLoading, data: personData } = useQuery({
    queryKey: ["person"],
    queryFn: () => getPersonData(personId),
    onError: (err) => {
      console.error(err);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const personDetails = personData?.personDetails;
  const personMovies = personData?.movieCredits;
  const personTv = personData?.tvCredits;
  const personImages = personData?.images;

  return {
    personDetails,
    personImages,
    personMovies,
    personTv,
    isLoading,
  };
}
