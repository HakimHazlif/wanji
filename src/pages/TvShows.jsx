import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Discover from "../components/Discover";
import { getImageViaPath } from "../utils/helper";
import ShowCard from "../ui/ShowCard";

import Pagination from "../components/Pagination";
import { useLists } from "../features/lists/useLists";
import { useLastFavorite } from "../features/lists/useLastFavorite";
import { useSpecificItems } from "../features/movies/useSpecificItems";
import { useListsContext } from "../context/ListsContext";

const Shows = () => {
  const category = "tv";
  const [title, setTitle] = useState("Popular TV Shows");
  const [description, setDescription] = useState("");
  const { favoriteListId } = useListsContext();
  const { tvId } = useLastFavorite(favoriteListId);

  const { isLoading, itemsList } = useSpecificItems(tvId, category);

  const [searchParams, setSearchParams] = useSearchParams();
  const tvTag = searchParams.get("tv-tag");
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = itemsList?.total_pages > 50 ? 50 : itemsList?.total_pages;

  useEffect(() => {
    switch (tvTag) {
      case "top_rated":
        setTitle("Top Rated TV Shows");
        setDescription(
          "TV shows with the highest ratings from critics and viewers, showcasing the best in quality, according to TMDB."
        );
        break;
      case "on_the_air":
        setTitle("TV Shows on the Air");
        setDescription(
          "TV shows currently airing on television or streaming platforms, reflecting the latest episodes, from TMDB."
        );
        break;
      case "airing_today":
        setTitle("TV Shows Airing Today");
        setDescription(
          "TV shows with recently released episodes, including today's and previous releases, featuring the latest content, according to TMDB."
        );
        break;
      case "for_you":
        setTitle("Suggestions For You");
        setDescription(
          "TV shows recommended based on your viewing history and preferences, tailored to match your interests and taste."
        );
        break;
      default:
        setTitle("Popular Movies");
        setDescription(
          "TV shows currently popular among viewers, based on high search volume or recent buzz, according to TMDB."
        );
        break;
    }
  }, [tvTag]);

  if (isLoading) return <Spinner />;

  return (
    <main className="">
      <Discover
        image={
          getImageViaPath(itemsList?.results?.[0]?.backdrop_path, 1280) || null
        }
      />
      <section className="padding-x py-14">
        <div className="border-b border-slate-700  pb-5">
          <h1 className="text-4xl  font-bold">{title}</h1>
          <p className="mt-5 text-base text-slate-400">{description}</p>
        </div>

        <div className="w-full justify-items-center grid xl:grid-cols-4 2xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  xs:grid-cols-2 gap-16 pt-20">
          {itemsList?.results?.map((tv) => (
            <ShowCard key={tv.id} show={tv} category={category} />
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

export default Shows;
