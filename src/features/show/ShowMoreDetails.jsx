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
    <aside className="w-[300px] rounded-lg py-7 px-5 flex-shrink-0  text-white flex flex-col gap-4 bg-[#181325]">
      <div className="font-semibold">
        {tagline && (
          <>
            <h3 className="w-[80px] font-semibold">Tagline:</h3>
            <p className="font-bold">{tagline}</p>
          </>
        )}
      </div>
      <div className="font-semibold">
        <h3 className="w-[80px]">Status:</h3>
        <p>{status}</p>
      </div>
      <div className="">
        {directing.length > 0 && (
          <>
            <h3 className="font-semibold w-[80px]">Director:</h3>
            <ul>
              {directing.map((person, index) => (
                <li key={person.id}>
                  <span className="mr-2">&#x2022;</span>
                  <Link
                    to={`/person/${person.id}`}
                    className="font-bold hover:text-orange-amber text-nowrap"
                  >
                    {person.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="font-semibold">
        {writing.length > 0 && (
          <>
            <h3 className="w-[80px]">Writer:</h3>
            <ul className="">
              {writing.map((person, index) => (
                <li key={person.id}>
                  <span className="mr-2">&#x2022;</span>
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
      <div className="font-semibold">
        {creator.length > 0 && (
          <>
            <h3 className="w-[80px]">Creator:</h3>
            <ul className="">
              {creator.map((person, index) => (
                <li key={person.id}>
                  <span className="mr-2">&#x2022;</span>
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

      <div className="flex font-semibold">
        {budget && (
          <>
            <h3 className="w-[80px]">Budget:</h3>
            <p>{formatHugeNumber(budget)}</p>
          </>
        )}
      </div>
      <div className="flex items-center font-semibold">
        {revenue && (
          <>
            <h3 className="w-[80px]">Revenue:</h3>
            <p>{formatHugeNumber(revenue)}</p>
          </>
        )}
      </div>
    </aside>
  );
};

export default ShowMoreDetails;
