import { Link } from "react-router";
import { profile } from "../assets/icons";
import { getImageViaPath, getPictureUrlFormat } from "../utils/helper";

const CreditCard = ({ person }) => {
  const { id, name, character, image } = person;

  const profilePath = getPictureUrlFormat(image, 400);
  return (
    <Link to={`person/${id}`} className="text-center cursor-pointer">
      <div className="w-40 overflow-hidden flex items-center justify-center">
        <img
          src={profilePath || profile}
          alt="cast picture"
          className="rounded-full w-36 h-36 object-cover"
        />
      </div>
      <div className="w-full mt-2">
        <h2 className="text-sm font-medium mb-1">{name}</h2>
        <h3 className="text-[11px] font-medium text-slate-600">{character}</h3>
      </div>
    </Link>
  );
};

export default CreditCard;
