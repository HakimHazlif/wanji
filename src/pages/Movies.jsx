import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Discover from "../components/Discover";
import { getImageViaPath } from "../utils/helper";
import ShowCard from "../ui/ShowCard";
import { useListsContext } from "../context/ListsContext";
import { useSpecificMovies } from "../features/movies/useSpecificMovies";
import Pagination from "../components/Pagination";

const Movies = () => {
  const category = "movie";
  const [title, setTitle] = useState("Popular Movies");
  const [description, setDescription] = useState("");
  const { interestsIds } = useListsContext();

  const { isLoading, moviesList } = useSpecificMovies(interestsIds.movieId);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieTag = searchParams.get("movie-tag");
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages =
    moviesList?.total_pages > 50 ? 50 : moviesList?.total_pages;

  useEffect(() => {
    switch (movieTag) {
      case "top_rated":
        setTitle("Top Rated Movies");
        setDescription(
          "Movies with the highest ratings from critics and viewers, showcasing the best in quality, according to TMDB."
        );
        break;
      case "now_playing":
        setTitle("Now Playing Movies");
        setDescription(
          "Movies currently available to watch in theaters or on streaming platforms, reflecting the latest releases, from TMDB."
        );
        break;
      case "upcoming":
        setTitle("Upcoming Movies");
        setDescription(
          "Movies set to be released soon, featuring anticipated titles and their release dates, according to TMDB."
        );
        break;
      case "for_you":
        setTitle("Suggestions For You");
        setDescription(
          "Movies recommended based on your viewing history and preferences, tailored to match your interests and taste."
        );
        break;
      default:
        setTitle("Popular Movies");
        setDescription(
          "Movies currently popular among viewers, based on high search volume or recent buzz, according to TMDB."
        );
        break;
    }
  }, [movieTag]);

  if (isLoading) return <Spinner />;

  return (
    <main className="">
      <Discover
        image={
          getImageViaPath(moviesList?.results?.[0]?.backdrop_path, 1280) || null
        }
      />
      <section className="padding-x py-14">
        <div className="border-b border-slate-700  pb-5">
          <h1 className="text-4xl  font-bold">{title}</h1>
          <p className="mt-5 text-base text-slate-400">{description}</p>
        </div>

        <div className="w-full grid grid-cols-4 gap-16 pt-20">
          {moviesList?.results?.map((movie) => (
            <ShowCard key={movie.id} show={movie} category={category} />
          ))}
        </div>

        <div className="flex justify-center py-20">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            changePage={(page) => {
              if (typeof page === "number" && page >= 1 && page <= totalPages) {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("page", page);
                setSearchParams(newParams);
              }
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default Movies;
