import { Link } from "react-router-dom";
import {
  formatHugeNumber,
  getMainCrewRolls,
  updateDateFormat,
} from "../../utils/helper";
import { useShow } from "./useShow";
import Detail from "../../components/Detail";

const ShowDetails = () => {
  const { details, credits } = useShow();
  const {
    status,
    budget,
    revenue,
    created_by,
    production_companies,
    origin_country,
    spoken_languages,
    number_of_seasons,
    number_of_episodes,
    in_production,
  } = details;

  const crew = getMainCrewRolls(credits?.crew);
  const { directing, writing } = crew;

  return (
    <section className="mt-20">
      <h2 className="heading-title-1 font-semibold border-b border-slate-700 pb-3">
        {details["title"] ? "Movie" : "Tv Show"} details
      </h2>

      <div className="w-full font-medium flex md:flex-row flex-col md:gap-10 gap-4 mt-7">
        <div className="md:w-2/5 w-full flex flex-col gap-4">
          <Detail detail="Status">
            <span>{status}</span>
          </Detail>

          {(details["release_date"] || details["first_air_date"]) && (
            <Detail
              detail={
                details["release_date"] ? "Release Date" : "First Air Date"
              }
            >
              <span>
                {updateDateFormat(
                  details["release_date"] || details["first_air_date"]
                )}
              </span>
            </Detail>
          )}

          {details["last_air_date"] && (
            <Detail detail="Last Air Date">
              <span>{updateDateFormat(details["last_air_date"])}</span>
            </Detail>
          )}

          {budget > 0 && (
            <Detail detail="Badget">
              <span>${formatHugeNumber(budget)}</span>
            </Detail>
          )}

          {revenue > 0 && (
            <Detail detail="Revenue">
              <span>${formatHugeNumber(revenue)}</span>
            </Detail>
          )}

          {number_of_seasons && (
            <Detail detail="Seasons">
              <span>
                {number_of_seasons}{" "}
                {number_of_seasons === 1 ? "Season" : "Seasons"}
              </span>{" "}
              <span>{in_production && "- Ongoing"}</span>
            </Detail>
          )}

          {number_of_episodes && (
            <Detail detail="Episodes">
              <span>{number_of_episodes} Episodes</span>
            </Detail>
          )}
        </div>
        <div className="md:w-3/5 w-full flex flex-col gap-4">
          {directing?.length > 0 && (
            <Detail detail="Directed By">
              <ul className="flex-1 flex flex-wrap gap-2 gap-y-0">
                {directing.map((director, index) => (
                  <Link
                    to={`/person/${director.id}`}
                    className="hover:text-blue-400"
                    key={director.id}
                  >
                    {director.name}
                    {directing.length - 1 !== index ? "," : ""}
                  </Link>
                ))}
              </ul>
            </Detail>
          )}

          {created_by?.length > 0 && (
            <Detail detail="Created By">
              <ul className="flex-1 flex flex-wrap gap-2 gap-y-0">
                {created_by.map((writer, index) => (
                  <Link
                    to={`/person/${writer.id}`}
                    className="hover:text-blue-400"
                    key={writer.id}
                  >
                    {writer.name}
                    {created_by.length - 1 !== index ? ", " : ""}
                  </Link>
                ))}
              </ul>
            </Detail>
          )}

          {writing?.length > 0 && (
            <Detail detail="Written By">
              <ul className="flex-1 flex flex-wrap gap-2 gap-y-0">
                {writing.map((writer, index) => (
                  <Link
                    to={`/person/${writer.id}`}
                    className="hover:text-blue-400"
                    key={writer.id}
                  >
                    {writer.name}
                    {writing.length - 1 !== index ? ", " : ""}
                  </Link>
                ))}
              </ul>
            </Detail>
          )}

          {production_companies.length > 0 && (
            <Detail detail="Produced By">
              <ul className="flex-1 flex flex-wrap gap-2 gap-y-0">
                {production_companies.map((studio, index) => (
                  <Link className="hover:text-blue-400" key={studio.id}>
                    {studio.name}{" "}
                    <span className="text-slate-300 text-sm">
                      {studio.origin_country && `(${studio.origin_country})`}
                      {production_companies.length - 1 !== index ? ", " : ""}
                    </span>
                  </Link>
                ))}
              </ul>
            </Detail>
          )}

          {origin_country.length > 0 && (
            <Detail detail="Origin Country">
              <ul className="flex-1 flex flex-wrap gap-2 gap-y-0">
                {origin_country.map((country, index) => (
                  <li key={index}>
                    {country}
                    {origin_country.length - 1 !== index ? ", " : ""}
                  </li>
                ))}
              </ul>
            </Detail>
          )}

          {spoken_languages.length > 0 && (
            <Detail detail="Spoken Languages">
              <ul className="flex-1 flex flex-wrap gap-2 gap-y-0">
                {spoken_languages.map((language, index) => (
                  <li key={index}>
                    {language.english_name === "No Language"
                      ? "Silent"
                      : language.english_name}
                    {language.english_name === language.name
                      ? ""
                      : ` (${language.name})`}
                    {spoken_languages.length - 1 !== index ? ", " : ""}
                  </li>
                ))}
              </ul>
            </Detail>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShowDetails;
