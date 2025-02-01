import { Link } from "react-router";
import {
  formatHugeNumber,
  getMainCrewRolls,
  updateDateFormat,
} from "../../utils/helper";
import { useShow } from "./useShow";

const ShowDetails = () => {
  const { details, credits } = useShow();
  const {
    tagline,
    overview,
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
    <section className="py-28">
      <h2 className="text-4xl font-semibold border-b border-slate-700 pb-3">
        {details["title"] ? "Movie" : "Tv Show"} details
      </h2>
      <div className="flex items-start justify-between gap-16 mt-8">
        <div className="w-2/5">
          <h3 className="font-medium text-xl text-slate-200">
            Tagline: {tagline}
          </h3>
          <p className="mt-4 mr-8 text-slate-400">{overview}</p>
        </div>

        <div className="w-3/5 font-medium flex flex-col gap-4">
          <div className="flex">
            <span className="w-40 text-slate-300">Status</span>
            <span>{status}</span>
          </div>

          {directing?.length > 0 && (
            <div className="flex ">
              <span className="w-40 text-slate-300">Directed By</span>
              <ul
                className={`flex gap-2 ${
                  directing.length > 3 ? "flex-col" : "flex-row"
                }`}
              >
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
            </div>
          )}

          {created_by?.length > 0 && (
            <div className="flex ">
              <span className="w-40 text-slate-300">Created By</span>
              <ul
                className={`flex gap-2 ${
                  created_by.length > 3 ? "flex-col" : "flex-row"
                }`}
              >
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
            </div>
          )}

          {writing?.length > 0 && (
            <div className="flex ">
              <span className="w-40 text-slate-300">Written By</span>
              <ul
                className={`flex gap-2 ${
                  writing.length > 3 ? "flex-col" : "flex-row"
                }`}
              >
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
            </div>
          )}

          {(details["release_date"] || details["first_air_date"]) && (
            <div className="flex">
              <span className="w-40 text-slate-300">
                {details["release_date"] ? "Release Date" : "First Air Date"}
              </span>
              <span>
                {updateDateFormat(
                  details["release_date"] || details["first_air_date"]
                )}
              </span>
            </div>
          )}

          {details["last_air_date"] && (
            <div className="flex">
              <span className="w-40 text-slate-300">Last Air Date</span>
              <span>{updateDateFormat(details["last_air_date"])}</span>
            </div>
          )}

          {budget > 0 && (
            <div className="flex">
              <span className="w-40 text-slate-300">Budget</span>
              <span>${formatHugeNumber(budget)}</span>
            </div>
          )}

          {revenue > 0 && (
            <div className="flex">
              <span className="w-40 text-slate-300">Revenue</span>
              <span>${formatHugeNumber(revenue)}</span>
            </div>
          )}

          {number_of_seasons && (
            <div className="flex">
              <span className="w-40 text-slate-300">Seasons</span>
              <span>
                {number_of_seasons}{" "}
                {number_of_seasons === 1 ? "season" : "seasons"}
              </span>
              <span>{in_production && "Ongoing"}</span>
            </div>
          )}

          {number_of_episodes && (
            <div className="flex">
              <span className="w-40 text-slate-300">Episodes</span>
              <span>{number_of_episodes} episodes</span>
            </div>
          )}

          {production_companies.length > 0 && (
            <div className="flex ">
              <span className="w-40 text-slate-300">Produced By</span>
              <ul className="flex flex-col">
                {production_companies.map((studio) => (
                  <Link className="hover:text-blue-400" key={studio.id}>
                    {studio.name}{" "}
                    <span className="text-slate-300 text-sm">
                      {studio.origin_country && `(${studio.origin_country})`}
                    </span>
                  </Link>
                ))}
              </ul>
            </div>
          )}

          {origin_country.length > 0 && (
            <div className="flex">
              <span className="w-40 text-slate-300">Origin Country</span>
              <ul
                className={`flex gap-2 ${
                  origin_country.length > 7 ? "flex-col" : "flex-row"
                }`}
              >
                {origin_country.map((country, index) => (
                  <li key={index}>
                    {country}
                    {origin_country.length - 1 !== index ? ", " : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {spoken_languages.length > 0 && (
            <div className="flex">
              <span className="w-40 text-slate-300">Spoken Languages</span>
              <ul
                className={`flex gap-2 ${
                  spoken_languages.length > 3 ? "flex-col" : "flex-row"
                }`}
              >
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShowDetails;
