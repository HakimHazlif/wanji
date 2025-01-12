import React from "react";
import { useSelector } from "react-redux";
import { showSimilar } from "../data/movieSlice";
import SmallShowCard from "../components/SmallShowCard";
import { getImageViaPath } from "../utils/functions";

const ShowSimilar = () => {
  const similarShows = useSelector(showSimilar);

  return (
    <section className="py-10">
      <h2 className="text-2xl">More like this</h2>
      <div className="overflow-x-scroll scrollbar-hide space-x-2 flex gap-2">
        {similarShows.map((show) => (
          <SmallShowCard
            key={show.id}
            id={show.id}
            title={show.title}
            image={getImageViaPath(show.poster_path, 1280)}
            rate={show.vote_average}
          />
        ))}
      </div>
    </section>
  );
};

export default ShowSimilar;
