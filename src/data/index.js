/*
async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY_TMDB}`,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/account/21555530/lists?page=1",
      options
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  /*
  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API}&i=tt10686814`)
    const result = await response.json()
    console.log(result)
  } catch (error){
    console.log(error)
  }
    
}

fetchMovieData();
*/
