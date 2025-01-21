import { useShow } from "../show/useShow";
import { Link } from "react-router";
import { getPictureUrlFormat } from "../../utils/helper";
import List from "./List";

const SeasonsList = () => {
  const { details } = useShow();
  const { seasons } = details;

  return (
    <section className="py-32">
      <List title="Seasons" viewAll={true}>
        {seasons.map((season) => (
          <div
            key={season.id}
            className="w-60 bg-slate-100 rounded-md overflow-hidden text-black relative"
          >
            <Link to={`/tv/${details.id}/season/${season.season_number}`}>
              <img
                src={getPictureUrlFormat(season.poster_path, 500)}
                alt="show poster"
                className="relative h-[370px] object-cover"
              />
              <div className="absolute bottom-[80px] right-[15px]">
                {season.vote_average}
              </div>
              <div className="flex flex-col gap-2 px-3 my-4">
                <h2 className="text-lg font-medium">{season.name}</h2>
                <h3 className="text-sm text-gray-700">{season.air_date}</h3>
              </div>
            </Link>
          </div>
        ))}
      </List>
    </section>
  );
};

export default SeasonsList;
