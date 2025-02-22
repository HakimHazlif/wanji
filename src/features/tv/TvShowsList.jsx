import ShowCard from "../../ui/ShowCard";
import ListScroll from "../lists/ListScroll";
import { useTvShows } from "./useTvShows";

const TvShowsList = ({ listKey, tvShows }) => {
  const category = "tv";

  let path, listTitle;
  if (listKey === "popularTv") {
    listTitle = "Popular TV Shows";
    path = "/tv-shows?tv-tag=popular&page=1";
  } else if (listKey === "topRatedTv") {
    listTitle = "Top Rated TV Shows";
    path = "/tv-shows?tv-tag=top_rated&page=1";
  } else if (listKey === "onTheAir") {
    listTitle = "TV Shows on the Air";
    path = "/tv-shows?tv-tag=on_the_air&page=1";
  } else if (listKey === "airingToday") {
    listTitle = "TV Shows Airing Today";
    path = "/tv-shows?tv-tag=airing_today&page=1";
  }

  return (
    <section className={`padding-x ${tvShows.length > 0 ? "pt-32" : ""}`}>
      {tvShows.length > 0 && (
        <ListScroll title={listTitle} path={path} viewAll={true}>
          {tvShows.map((tv) => (
            <ShowCard key={tv.id} show={tv} category={category} />
          ))}
        </ListScroll>
      )}
    </section>
  );
};

export default TvShowsList;
