import { useNavigate } from "react-router";
import { profile } from "../assets/icons";
import { getProfileImageUrl } from "../utils/helper";
import { Tooltip } from "@mui/material";

const CreditCard = ({ person, direction = "col", size = "big" }) => {
  const navigate = useNavigate();
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

  function handleNavigate() {
    navigate(`/person/${id}`);
  }

  return (
    <div
      className={`flex gap-3 ${
        direction === "row"
          ? "flex-row justify-center items-center text-start"
          : "flex-col justify-center items-center text-center"
      }`}
    >
      <div
        className={`relative ${getPictureSize()} overflow-hidden rounded-full flex-shrink-0`}
      >
        <Tooltip title={name}>
          <img
            src={profilePath || profile}
            alt="cast picture"
            className={`${getPictureSize()} rounded-full object-cover cursor-pointer`}
            onClick={handleNavigate}
          />
        </Tooltip>
      </div>

      <div className="w-full mt-2">
        <Tooltip title={name}>
          <h2
            className="text-sm font-medium mb-1 cursor-pointer hover:text-blue-500 duration-200 transition-colors"
            onClick={handleNavigate}
          >
            {name}
          </h2>
        </Tooltip>
        <h3 className="text-[11px] font-medium text-slate-400">{role}</h3>
      </div>
    </div>
  );
};

export default CreditCard;
