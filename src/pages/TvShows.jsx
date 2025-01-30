import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Discover from "../components/Discover";
import { getImageViaPath } from "../utils/helper";
import ShowCard from "../ui/ShowCard";
import { useTvShows } from "../features/tv/useTvShows";
import { useSpecificTv } from "../features/tv/useSpecificTv";
import { useListsContext } from "../context/ListsContext";
import Pagination from "../components/Pagination";

const Shows = () => {
  const category = "tv";
  const [title, setTitle] = useState("Popular TV Shows");
  const [description, setDescription] = useState("");
  const { interestsIds } = useListsContext();

  const [searchParams] = useSearchParams();
  const tvTag = searchParams.get("tv-tag");

  const { isLoading, tvList } = useSpecificTv(interestsIds.tvId);

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
          getImageViaPath(tvList?.results?.[0]?.backdrop_path, 1280) || null
        }
      />
      <section className="padding-x py-14">
        <div className="border-b border-slate-700  pb-5">
          <h1 className="text-4xl  font-bold">{title}</h1>
          <p className="mt-5 text-base text-slate-400">{description}</p>
        </div>

        <div className="w-full grid grid-cols-4 gap-16 pt-20">
          {tvList?.results?.map((tv) => (
            <ShowCard key={tv.id} show={tv} category={category} />
          ))}
        </div>

        <div className="flex justify-center py-20">
          <Pagination
            totalPages={tvList?.total_pages > 50 ? 50 : tvList.total_pages}
          />
        </div>
      </section>
    </main>
  );
};

export default Shows;
