import { Link } from "react-router-dom";

const CreditView = ({ cretids, job }) => {
  return (
    <h3 className="flex flex-wrap gap-2 md:font-bold md:text-base text-sm">
      <span className="text-gray-400 font-medium">
        {job === "Created by" || cretids.length === 1 ? `${job}:` : `${job}s:`}
      </span>
      <ul className="flex flex-wrap gap-2">
        {cretids.map((person, index) => (
          <li key={person.id} className="flex flex-wrap gap-2">
            {index !== 0 && <span className="text-slate-300">&#x2022;</span>}
            <Link
              to={`/person/${person.id}`}
              className="font-semibold hover:text-orange-coral"
            >
              {person.name}
            </Link>
          </li>
        ))}
      </ul>
    </h3>
  );
};

export default CreditView;
