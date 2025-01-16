import { Link } from "react-router";
import { getPictureUrlFormat } from "../utils/helper";

const ShowCard2 = ({ show }) => {
  const {
    id,
    poster_path: poster,
    releaseDate,
    vote_average: rate,
    runtime,
    genres,
  } = show;
  const title = show?.title || show?.name;
  const isMovie = "title" in show;

  return (
    <div className="w-[300px] h-[500px] rounded-[35px] relative shadow-xl">
      <Link
        to={`/${isMovie ? "movie" : "tv"}/${id}`}
        className="content-card w-full h-full absolute top-0 left-0 border-[35px] overflow-hidden cursor-pointer group hover:-top-12"
      >
        <img
          src={getPictureUrlFormat(poster, 500)}
          className="transform scale-125 group-hover:scale-125 w-full h-full absolute top-0 left-0 object-cover"
        />
        <span className="w-full h-[170px] block absolute bottom-0 left-0 bg-[#0f274D] shadow-lg blur-md"></span>
        <div className="absolute text-[#eee] bottom-5">
          <h1 className="font-bold text-4xl">{title}</h1>
          <p className="text-[#aaa] font-bold text-sm">{releaseDate}</p>
          <b className="my-[5px]">{runtime}min</b>
          <div className="stars">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShowCard2;
