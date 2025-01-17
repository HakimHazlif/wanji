import { Link } from "react-router";
import {
  formatHugeNumber,
  getMainCrewRolls,
  getPictureUrlFormat,
} from "../../utils/helper";
import { useShow } from "./useShow";
import ShowStatus from "../../ui/ShowStatus";

const ShowMoreDetails = () => {
  const { details, credits } = useShow();
  const {
    tagline,
    status,
    budget,
    revenue,
    production_companies: companies,
    created_by,
  } = details;

  const crew = getMainCrewRolls(credits?.crew);
  const { directing, writing, production, creator } = crew;

  return (
    <aside className="w-[400px] rounded-lg py-7 px-5 flex-shrink-0  text-white flex flex-col gap-4 bg-bluish-black">
      <div className="font-semibold flex">
        {tagline && (
          <>
            <h3 className="w-[80px] font-semibold">Tagline:</h3>
            <p className="font-bold">{tagline}</p>
          </>
        )}
      </div>
      <div className="font-semibold flex items-center">
        <h3 className="w-[80px]">Status:</h3>
        <ShowStatus status={status} />
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
      <hr className="border-slate-600" />
      {directing.length > 0 && (
        <div className="">
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
        </div>
      )}
      {writing.length > 0 && (
        <div className="font-semibold">
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
        </div>
      )}
      {created_by && (
        <div className="font-semibold">
          <h3 className="w-[80px]">Creator:</h3>
          <ul className="">
            {created_by.map((person, index) => (
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
        </div>
      )}
    </aside>
  );
};

export default ShowMoreDetails;
