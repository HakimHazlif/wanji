import { useSelector } from "react-redux";
import { moviesList, seriesList } from "../data/showsSlice";
import ShowCard from "../components/ShowCard";
import {
  getImageViaPath,
  updateDateFormat,
  ratePercentage,
  getYearMonthFormat,
} from "../utils/functions";

const ShowsList = ({ type }) => {
  const shows =
    type === "movies" ? useSelector(moviesList) : useSelector(seriesList);

  return (
    <section className="padding-x my-28">
      <h2 className="text-4xl first-letter:uppercase text-white text-start mb-10">
        {type}
      </h2>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
          {shows &&
            shows.map((show) => {
              const dateFormat =
                type === "movies"
                  ? updateDateFormat(show.release_date)
                  : getYearMonthFormat(show.first_air_date);
              return (
                <ShowCard
                  key={show.id}
                  id={show.id}
                  title={show.title || show.name}
                  image={getImageViaPath(show.poster_path, 400)}
                  releaseDate={dateFormat}
                  rate={ratePercentage(show.vote_average)}
                  type={type}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ShowsList;
