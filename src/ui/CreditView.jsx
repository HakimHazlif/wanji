import { Link } from "react-router";

const CreditView = ({ cretids, job }) => {
  return (
    <div className="flex gap-2">
      <h4 className="font-medium text-slate-300">
        {job === "Created by" || cretids.length === 1 ? `${job}:` : `${job}s:`}
      </h4>
      <ul className="flex gap-2">
        {cretids.map((person, index) => (
          <li key={person.id} className="flex gap-2">
            {index !== 0 && <span className="text-slate-300">&#x2022;</span>}
            <Link
              to={`/person/${person.id}`}
              className="font-semibold text-blue-600 hover:text-orange-coral"
            >
              {person.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreditView;
