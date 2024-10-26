import { useSelector } from "react-redux";
import { moviesList, seriesList } from "../data/showsSlice";
import ShowCard from "../components/ShowCard";
import { getBackdrop, updateDateFormat, ratePercentage } from "../utils/functions";

const ShowsList = ({ type }) => {
  const shows = type === 'movies' ? useSelector(moviesList) : useSelector(seriesList)

  return (
    <section className="padding-x my-28">
      <h2 className="text-4xl first-letter:uppercase text-white text-start mb-10">{type}</h2>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
          { shows &&
            shows.map(show => 
            ( 
              <ShowCard
                key={show.id}
                id={show.id}
                title={show.title}
                image={getBackdrop(show.poster_path)}
                releaseDate={updateDateFormat(show.release_date)}
                rate={ratePercentage(show.vote_average)}
              />
            ))
          }
        </div>
      </div>
    </section>
    
  )
}

export default ShowsList