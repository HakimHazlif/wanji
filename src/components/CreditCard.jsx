import { profile } from "../assets/icons";
import { getImageViaPath } from "../utils/helper";

const CreditCard = (props) => {
  const { id, name, character, image } = props;

  const profilePath = image ? getImageViaPath(image, 400) : null;
  return (
    <div className="w-full text-center cursor-pointer">
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
    </div>
  );
};

export default CreditCard;
