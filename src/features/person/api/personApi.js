import axios from "axios";
import { options, URL_Base } from "../../../services/variables";

export async function getPersonData(personId) {
  const personUrl = `${URL_Base}person/${personId}?append_to_response=movie_credits%2Ctv_credits%2Cimages%2Clatest&language=en-US`;

  const personData = await axios.get(personUrl, options);

  return {
    personDetails: {
      biography: personData?.data?.biography,
      birthday: personData?.data?.birthday,
      deathday: personData?.data?.deathday,
      gender: personData?.data?.gender,
      homepage: personData?.data?.homepage,
      id: personData?.data?.id,
      knownAs: personData?.data?.known_for_department,
      name: personData?.data?.name,
      palceOfBirth: personData?.data?.place_of_birth,
      popularity: personData?.data?.popularity,
      profile_path: personData?.data?.profile_path,
    },
    movieCredits: personData?.data?.movie_credits,
    tvCredits: personData?.data?.tv_credits,
    images: personData?.data?.images?.profiles,
  };
}

export async function fetchPeople() {
  const trendingPeopleUrl = `${URL_Base}trending/person/week?language=en-US`;
  const popularPeopleUrl = `${URL_Base}person/popular?language=en-US&page=1`;

  const [trendingPeopleList, popularPeopleList] = await axios.all([
    axios.get(trendingPeopleUrl, options),
    axios.get(popularPeopleUrl, options),
  ]);

  return {
    trendingPeopleList: trendingPeopleList?.data?.results,
    popularPeopleList: popularPeopleList?.data?.results,
  };
}
