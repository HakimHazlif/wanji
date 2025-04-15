import { useVitualMedia } from "../../vitualMedia/hooks/useVitualMedia";
import { getPictureUrlFormat, getYearMonthFormat } from "../../../utils/helper";
import ListScroll from "../../../components/ListScroll";
import { FaStar } from "react-icons/fa";
import EmptyPoster from "../../../components/EmptyPoster";
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate";

const SeasonsList = () => {
  const { transitionNavigate } = useTransitionNavigate();

  const { details } = useVitualMedia();
  const { seasons } = details;

  function handleNavigate(number) {
    transitionNavigate(`/tv/${details.id}/season/${number}`);
  }

  const seasonsWithoutSpecial = seasons?.filter(
    (season) => season.name !== "Specials"
  );

  return (
    <section className="">
      <ListScroll title="Seasons">
        {seasonsWithoutSpecial.map((season) => (
          <div key={season.id} className="w-52 text-white">
            <div>
              {season.poster_path ? (
                <img
                  src={getPictureUrlFormat(season.poster_path, 500)}
                  alt="show poster"
                  className="relative w-full rounded-md object-cover cursor-pointer"
                  onClick={() => handleNavigate(season.season_number)}
                />
              ) : (
                <EmptyPoster />
              )}
              <div className="px-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-slate-400 font-medium">
                    {getYearMonthFormat(season.air_date)}
                  </span>
                  <div className="rounded-md bg-orange-amber w-[45px] h-6  flex items-center justify-center gap-1 text-xs font-bold">
                    <FaStar />
                    <p>{season.vote_average.toFixed(1)}</p>
                  </div>
                </div>

                <h2
                  className="text-lg font-medium cursor-pointer"
                  onClick={() => handleNavigate(season.season_number)}
                >
                  {season.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </ListScroll>
    </section>
  );
};

export default SeasonsList;
