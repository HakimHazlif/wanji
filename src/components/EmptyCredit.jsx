import { Tooltip } from "@mui/material";
import { FaUser } from "react-icons/fa";

const EmptyCredit = ({
  iconSize,
  pictureSize,
  personName,
  onNavigate = null,
}) => {
  function getIconSize() {
    switch (iconSize) {
      case "small":
        return "text-4xl";
      case "meduim":
        return "text-7xl";
      case "big":
        return "text-8xl";
      default:
        return "text-7xl";
    }
  }

  return (
    <Tooltip title={personName}>
      <div
        className={`${pictureSize} rounded-full flex justify-center items-center bg-slate-900`}
        onClick={onNavigate}
      >
        <FaUser className={`${getIconSize()} text-slate-400`} />
      </div>
    </Tooltip>
  );
};

export default EmptyCredit;
