import { Link } from "react-router";
import { profile } from "../assets/icons";
import { getProfileImageUrl } from "../utils/helper";

const CreditCard = ({ person, direction = "col", size = "big" }) => {
  const { id, name, profile_path } = person;

  const role = person.character || person.job;

  const profilePath = getProfileImageUrl(profile_path);

  function getPictureSize() {
    switch (size) {
      case "small":
        return "w-16 h-16";
      case "meduim":
        return "w-24 h-24";
      case "big":
        return "w-36 h-36";
      default:
        return "w-32 h-32";
    }
  }

  return (
    <Link
      to={`/person/${id}`}
      className={`flex gap-3 ${
        direction === "row"
          ? "flex-row justify-center items-center text-start"
          : "flex-col justify-center items-center text-center"
      } cursor-pointer`}
    >
      <div
        className={`relative ${getPictureSize()} overflow-hidden rounded-full flex-shrink-0`}
      >
        <img
          src={profilePath || profile}
          alt="cast picture"
          className={`${getPictureSize()} rounded-full object-cover`}
        />
      </div>

      <div className="w-full mt-2">
        <h2 className="text-sm font-medium mb-1">{name}</h2>
        <h3 className="text-[11px] font-medium text-slate-400">{role}</h3>
      </div>
    </Link>
  );
};

export default CreditCard;
