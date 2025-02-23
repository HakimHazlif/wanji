import { useNavigate } from "react-router";
import { getProfileImageUrl } from "../utils/helper";
import { Tooltip } from "@mui/material";
import { MdTrendingUp } from "react-icons/md";
import EmptyCredit from "./EmptyCredit";

const CreditCard = ({
  person,
  direction = "col",
  size = "big",
  inHomePage = false,
}) => {
  const navigate = useNavigate();
  const { id, name, profile_path, known_for_department, popularity } = person;

  const role = person.character || person.job;

  const profilePath = getProfileImageUrl(profile_path);

  function getPictureSize() {
    switch (size) {
      case "small":
        return "sm:w-16 sm:h-16 w-14 h-14";
      case "meduim":
        return "sm:w-24 sm:h-24 w-20 h-20";
      case "big":
        return "sm:w-36 sm:h-36 w-32 h-32";
      default:
        return "sm:w-32 sm:h-32 w-28 h-28";
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
        className={`relative ${getPictureSize()} overflow-hidden rounded-full flex-shrink-0 cursor-pointer`}
      >
        {profilePath ? (
          <Tooltip title={name}>
            <img
              src={profilePath}
              alt="cast picture"
              className={`${getPictureSize()} object-cover cursor-pointer`}
              onClick={handleNavigate}
            />
          </Tooltip>
        ) : (
          <EmptyCredit
            iconSize={size}
            pictureSize={getPictureSize()}
            onNavigate={handleNavigate}
            personName={name}
          />
        )}
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
        {!inHomePage ? (
          <h3 className="text-[11px] font-medium text-slate-400">{role}</h3>
        ) : (
          <div className="flex gap-2 justify-center">
            {popularity > 0 && (
              <h3 className="text-[11px] font-medium text-slate-400 flex gap-1 items-center justify-center">
                <MdTrendingUp />
                {popularity}
              </h3>
            )}
            <p className="text-[11px] font-medium text-slate-400">
              {known_for_department}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCard;
