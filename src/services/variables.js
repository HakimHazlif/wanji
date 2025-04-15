export const URL_Base = "https://api.themoviedb.org/3/";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`,
  },
};
