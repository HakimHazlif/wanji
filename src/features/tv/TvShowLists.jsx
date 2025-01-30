import { useTvShows } from "./useTvShows";
import ListScroll from "../lists/ListScroll";
import Spinner from "../../ui/Spinner";
import ShowCard from "../../ui/ShowCard";

const TvLists = () => {
  const { isLoading, tvShows, error } = useTvShows();
  const category = "tv";

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  // console.log(tvShows);

  const popularTv = tvShows.popularTv.slice(0, 9);
  const topRatedTv = tvShows.topRatedTv.slice(0, 9);
  const onTheAir = tvShows.onTheAir.slice(0, 9);
  const airingToday = tvShows.airingToday.slice(0, 9);

  return (
    <section className="flex flex-col gap-20 padding-x py-28">
      <ListScroll
        title="Popular TV Shows"
        path="tv-shows?tv-tag=popular&page=1"
        viewAll={true}
      >
        {popularTv.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} category={category} />
        ))}
      </ListScroll>
      <ListScroll
        title="Top Rated TV Shows"
        path="tv-shows?tv-tag=top_rated&page=1"
        viewAll={true}
      >
        {topRatedTv.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} category={category} />
        ))}
      </ListScroll>
      <ListScroll
        title="TV Shows on the Air"
        path="tv-shows?tv-tag=on_the_air&page=1"
        viewAll={true}
      >
        {onTheAir.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} category={category} />
        ))}
      </ListScroll>
      <ListScroll
        title="TV Shows Airing Today"
        path="tv-shows?tv-tag=airing_today&page=1"
        viewAll={true}
      >
        {airingToday.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} category={category} />
        ))}
      </ListScroll>
    </section>
  );
};

export default TvLists;
