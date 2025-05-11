import { useParams, useSearchParams } from "react-router-dom";
import { useGenre } from "../hooks/useGenre";
import Spinner from "../../../ui/Spinner";
import Discover from "../../../components/Discover";
import { getImageViaPath } from "../../../utils/helper";
import MediaSectionHeader from "../../../components/MediaSectionHeader";
import MediaGrid from "../../../components/MediaGrid";
import MediaCard from "../../../ui/MediaCard";
import Pagination from "../../../components/Pagination";

const Genre = () => {
  const { genreList, isLoading } = useGenre();

  const { genre, category } = useParams();
  const updatedGenre = genre
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = genreList?.total_pages;
  //  > 50 ? 50 : genreList?.total_pages;

  if (isLoading) return <Spinner />;

  return (
    <main className="">
      <Discover
        image={
          getImageViaPath(genreList?.results?.[0]?.backdrop_path, 1280) || null
        }
      />
      <section className="padding-x py-32">
        <MediaSectionHeader
          title={`${updatedGenre} ${
            category === "movie" ? "Movies" : "TV Shows"
          }`}
          description={`A curated list of ${
            category === "movie" ? "Movies" : "TV Shows"
          }
            that belong to the ${genre.replace("-", " ")} genre`}
        />

        <MediaGrid>
          {genreList?.results?.map((show) => (
            <MediaCard key={show.id} show={show} category={category} />
          ))}
        </MediaGrid>

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
