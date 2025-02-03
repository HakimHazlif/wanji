import axios from "axios";
import { options, URL_Base } from "../constants/variables";

export async function fetchTrendingPeople() {
  const trendingPeopleUrl = `${URL_Base}trending/person/week?language=en-US`;

  const trendingPeopleList = await axios.get(trendingPeopleUrl, options);

  return trendingPeopleList.data.results;
}

export async function fetchPopularPeople() {
  const popularPeopleUrl = `${URL_Base}person/popular?language=en-US&page=1`;

  const popularPeopleList = await axios.get(popularPeopleUrl, options);

  return popularPeopleList.data.results;
}
