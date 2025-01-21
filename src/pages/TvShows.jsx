import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Discover from "../components/Discover";
import { getImageViaPath } from "../utils/helper";
import ShowCard from "../ui/ShowCard";
import { useTvShows } from "../features/tv/useTvShows";

const Shows = () => {
  const [searchParams] = useSearchParams();
  const tvTag = searchParams.get("tvTag");
  const [tvList, setTvList] = useState([]);

  const { isLoading, tvShows, error } = useTvShows();
  const category = "tv";

  useEffect(() => {
    switch (tvTag) {
      case "top-rated-shows":
        setTvList(tvShows?.topRatedTv);
        break;
      case "tv-on-the-air":
        setTvList(tvShows?.onTheAir);
        break;
      case "tv-airing-today":
        setTvList(tvShows?.airingToday);
        break;
      default:
        setTvList(tvShows?.popularTv);
        break;
    }
  }, [tvTag]);

  if (isLoading) return <Spinner />;

  return (
    <main className="">
      <Discover
        image={getImageViaPath(tvList?.[0]?.backdrop_path, 1280) || null}
      />
      <section className="padding-x py-32">
        <div className="w-full grid grid-cols-4 gap-16 ">
          {tvList?.map((tv) => (
            <ShowCard key={tv.id} show={tv} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Shows;
