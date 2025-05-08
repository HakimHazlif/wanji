import { useEffect, useMemo, useState } from "react";
import { useListsContext } from "../../../context/ListsContext";
import { useLastFavorite } from "../../userLists/hooks/useLastFavorite";
import { useSpecificItems } from "../hooks/useSpecificItems";
import { useItemsStatus } from "../../userLists/hooks/useItemsStatus";
import { useSearchParams } from "react-router-dom";
import Discover from "../../../components/Discover";
import { getImageViaPath } from "../../../utils/helper";
import Spinner from "../../../ui/Spinner";
import MediaSectionHeader from "../../../components/MediaSectionHeader";
import MediaGrid from "../../../components/MediaGrid";
import MediaCard from "../../../ui/MediaCard";
import Pagination from "../../../components/Pagination";

const Movies = () => {
  const category = "movie";
  const [title, setTitle] = useState("Popular Movies");
  const [description, setDescription] = useState("");
  const { favoriteListId } = useListsContext();
  const { movieId, isLodaing: movieIdLoading } =
    useLastFavorite(favoriteListId);

  const { isLoading, itemsList } = useSpecificItems(movieId, category);

  const uniqueMedia = useMemo(() => {
    return itemsList?.results?.map((show) => show.id);
  }, [itemsList?.results]);

  const { isLoading: isFeaturesLoading } = useItemsStatus(
    uniqueMedia?.length ? uniqueMedia : null,
    category
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const movieTag = searchParams.get("movies-tag");
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = itemsList?.total_pages > 50 ? 50 : itemsList?.total_pages;

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

  if (isLoading || movieIdLoading || isFeaturesLoading) return <Spinner />;

  return (
    <div className="">
      <Discover
        image={
          getImageViaPath(itemsList?.results?.[0]?.backdrop_path, 1280) || null
        }
      />

      <section className="padding-x py-24">
        <MediaSectionHeader
          title={title}
          description={description}
          typeTag="movies-tag"
        />

        <MediaGrid>
          {itemsList?.results?.map((movie) => (
            <MediaCard key={movie.id} show={movie} category={category} />
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
    </div>
  );
};

export default Movies;
