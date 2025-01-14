import { Link } from "react-router";
import { formatHugeNumber, getPictureUrlFormat } from "../../utils/helper";

const ShowMoreDetails = ({ isMovie, crew, details }) => {
  const {
    tagline,
    status,
    budget,
    revenue,
    production_companies: companies,
  } = details;
  const { directing, writing, production } = crew;

  return (
    <section className="py-32 text-white flex gap-4 justify-between">
      <div>
        <div className="flex gap-3 font-semibold">
          <h3>Tagline:</h3>
          <p>{tagline}</p>
        </div>
        <div className=" flex gap-3 font-semibold">
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
        </div>
        <div className=" flex gap-3 font-semibold">
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
          <h3>Budget:</h3>
          <p>{formatHugeNumber(budget)}</p>
        </div>
        <div className=" flex gap-3 items-center font-semibold">
          <h3>Revenue:</h3>
          <p>{formatHugeNumber(revenue)}</p>
        </div>
        <ul className="flex gap-5">
          {companies.map((company) => (
            <li key={company.id} className="flex text-sm gap-2 items-center">
              <div className="h-[60px] w-[60px] bg-slate-50 flex justify-center items-center rounded-full">
                <img
                  src={getPictureUrlFormat(company.logo_path, 400)}
                  alt="company logo"
                  className="w-full p-1"
                />
              </div>
              <h3 className="w-20 text-sm">{company.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ShowMoreDetails;
