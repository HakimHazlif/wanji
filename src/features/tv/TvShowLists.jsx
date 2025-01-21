import { useTvShows } from "./useTvShows";
import List from "../lists/List";
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
    <section className="flex flex-col gap-20 padding-x">
      <List title="Trending TV Shows" path="tv-shows" viewAll={true}>
        {popularTv.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} category={category} />
        ))}
      </List>
      <List
        title="Top Rated TV Shows"
        path="tv-shows?tvTag=top-rated-shows"
        viewAll={true}
      >
        {topRatedTv.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} category={category} />
        ))}
      </List>
      <List
        title="TV Shows on the Air"
        path="tv-shows?tvTag=tv-on-the-air"
        viewAll={true}
      >
        {onTheAir.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} category={category} />
        ))}
      </List>
      <List
        title="TV Shows Airing Today"
        path="tv-shows?tvTag=tv-airing-today"
        viewAll={true}
      >
        {airingToday.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} category={category} />
        ))}
      </List>
    </section>
  );
};

export default TvLists;
