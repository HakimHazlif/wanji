import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const CreatedByAuth = ({ createdDate, username }) => {
  return (
    <div className="flex gap-1 font-semibold">
      {createdDate && (
        <p className="md:text-base sm:text-sm text-xs">
          Created <span className="">{formatDistanceToNow(createdDate)}</span>{" "}
          ago by{" "}
          <span>
            <Link
              to={`/u/${username.replace(" ", "-")}`}
              className="font-bold text-orange-amber"
            >
              {username}
            </Link>
          </span>
        </p>
      )}
    </div>
  );
};

export default CreatedByAuth;
