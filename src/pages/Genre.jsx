import { useParams, useSearchParams } from "react-router";
import Discover from "../components/Discover";
import { useGenre } from "../features/show/useGenre";
import ShowCard from "../ui/ShowCard";
import Spinner from "../ui/Spinner";
import { getImageViaPath } from "../utils/helper";
import Pagination from "../components/Pagination";

const Genre = () => {
  const { genreList, isLoading } = useGenre();

  const { genre, category } = useParams();
  const updatedGenre = genre
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = genreList?.total_pages > 50 ? 50 : genreList?.total_pages;

  if (isLoading) return <Spinner />;

  return (
    <main className="">
      <Discover
        image={
          getImageViaPath(genreList?.results?.[0]?.backdrop_path, 1280) || null
        }
      />
      <section className="padding-x py-14">
        <div className="border-b border-slate-700  pb-5">
          <h1 className="text-4xl  font-bold">
            {updatedGenre} {category === "movie" ? "Movies" : "TV Shows"}
          </h1>
          <p className="mt-5 text-base text-slate-400">
            A curated list of {category === "movie" ? "Movies" : "TV Shows"}{" "}
            that belong to the {genre.replace("-", " ")} genre
          </p>
        </div>

        <div className="w-full grid grid-cols-4 gap-16 pt-20">
          {genreList?.results?.map((show) => (
            <ShowCard key={show.id} show={show} category={category} />
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

export default Genre;
