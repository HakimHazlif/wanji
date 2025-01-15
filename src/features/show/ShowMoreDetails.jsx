import { Link } from "react-router";
import {
  formatHugeNumber,
  getMainCrewRulls,
  getPictureUrlFormat,
} from "../../utils/helper";
import { useShow } from "./useShow";

const ShowMoreDetails = () => {
  const { details, credits } = useShow();
  const {
    tagline,
    status,
    budget,
    revenue,
    production_companies: companies,
  } = details;

  const crew = getMainCrewRulls(credits?.crew);
  const { directing, writing, production, creator } = crew;

  return (
    <section className="py-32 text-white flex gap-4 justify-between">
      <div>
        <div className="flex gap-3 font-semibold">
          {tagline && (
            <>
              <h3>Tagline:</h3>
              <p>{tagline}</p>
            </>
          )}
        </div>
        <div className=" flex gap-3 font-semibold">
          {directing.length > 0 && (
            <>
              <h3>Director:</h3>
              <ul>
                {directing.map((person, index) => (
                  <li key={person.id}>
                    {index !== 0 && <span className="mr-2">&#x2022;</span>}
                    <Link
                      to={`/person/${person.id}`}
                      className="hover:text-orange-amber"
                    >
                      {person.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className=" flex gap-3 font-semibold">
          {writing.length > 0 && (
            <>
              <h3>Writer:</h3>
              <ul className="flex gap-2">
                {writing.map((person, index) => (
                  <li key={person.id}>
                    {index !== 0 && <span className="mr-2">&#x2022;</span>}
                    <Link
                      to={`/person/${person.id}`}
                      className="hover:text-orange-amber"
                    >
                      {person.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className=" flex gap-3 font-semibold">
          {creator.length > 0 && (
            <>
              <h3>Creator:</h3>
              <ul className="flex gap-2">
                {creator.map((person, index) => (
                  <li key={person.id}>
                    {index !== 0 && <span className="mr-2">&#x2022;</span>}
                    <Link
                      to={`/person/${person.id}`}
                      className="hover:text-orange-amber"
                    >
                      {person.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div>
        <div className=" flex gap-3 items-center font-semibold">
          <h3>Status:</h3>
          <p
            className={`${
              status === "Released" ? "bg-[#15df15]" : "bg-[#f8f41d]"
            } py-0.5 px-3 rounded-md font-bold`}
          >
            {status}
          </p>
        </div>
        <div className=" flex gap-3 items-center font-semibold">
          {budget && (
            <>
              <h3>Budget:</h3>
              <p>{formatHugeNumber(budget)}</p>
            </>
          )}
        </div>
        <div className=" flex gap-3 items-center font-semibold">
          {revenue && (
            <>
              <h3>Revenue:</h3>
              <p>{formatHugeNumber(revenue)}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShowMoreDetails;
