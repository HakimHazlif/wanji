import { useTvShows } from "./useTvShows";
import List from "../lists/List";
import Spinner from "../../ui/Spinner";
import ShowCard from "../../ui/ShowCard";

const TvLists = () => {
  const { isLoading, tvShows, error } = useTvShows();

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  // console.log(tvShows);

  const popularTv = tvShows.popularTv.filter(
    (tvShow, index) => index < 8 && tvShow
  );
  const topRatedTv = tvShows.topRatedTv.filter(
    (tvShow, index) => index < 8 && tvShow
  );
  const onTheAir = tvShows.onTheAir.filter(
    (tvShow, index) => index < 8 && tvShow
  );
  const airingToday = tvShows.airingToday.filter(
    (tvShow, index) => index < 8 && tvShow
  );

  return (
    <section className="flex flex-col gap-20 padding-x">
      <List title="Trending TV Shows">
        {popularTv.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} title={tvShow.name} />
        ))}
      </List>
      <List title="Top Rated TV Shows">
        {topRatedTv.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} title={tvShow.name} />
        ))}
      </List>
      <List title="TV Shows on the Air">
        {onTheAir.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} title={tvShow.name} />
        ))}
      </List>
      <List title="TV Shows Airing Today">
        {airingToday.map((tvShow) => (
          <ShowCard key={tvShow.id} show={tvShow} title={tvShow.name} />
        ))}
      </List>
    </section>
  );
};

export default TvLists;
