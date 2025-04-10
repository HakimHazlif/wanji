import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const CreatedByAuth = ({ createdDate, username }) => {
  return (
    <div className="flex gap-1 font-semibold">
      {createdDate && (
        <p className="">
          Created <span className="">{formatDistanceToNow(createdDate)}</span>{" "}
          ago
        </p>
      )}
      <p>
        by{" "}
        <Link
          to={`/u/${username.replace(" ", "-")}`}
          className="font-bold text-orange-amber"
        >
          {username}
        </Link>
      </p>
    </div>
  );
};

export default CreatedByAuth;
