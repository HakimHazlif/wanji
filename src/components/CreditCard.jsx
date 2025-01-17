import { Link } from "react-router";
import { profile } from "../assets/icons";
import {
  getImageViaPath,
  getPictureUrlFormat,
  getProfileImageUrl,
} from "../utils/helper";

const CreditCard = ({ person }) => {
  const { id, name, character, profile_path } = person;

  const profilePath = getProfileImageUrl(profile_path, 400);
  return (
    <Link
      to={`person/${id}`}
      className="flex flex-col justify-center items-center text-center cursor-pointer"
    >
      <div className="w-40 overflow-hidden flex items-center justify-center">
        <img
          src={profilePath || profile}
          alt="cast picture"
          className="rounded-full w-36 h-36 object-cover"
        />
      </div>
      <div className="w-full mt-2">
        <h2 className="text-sm font-medium mb-1">{name}</h2>
        <h3 className="text-[11px] font-medium text-slate-400">{character}</h3>
      </div>
    </Link>
  );
};

export default CreditCard;
