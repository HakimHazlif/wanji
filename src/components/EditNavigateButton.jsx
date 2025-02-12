import { Tooltip } from "@mui/material";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const EditNavigateButton = ({ navigateLink, tooltipTitle, children }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={tooltipTitle}>
      <span>
        <button
          className="flex gap-2 items-center justify-center font-medium py-2 px-8 hover:bg-slate-600 bg-slate-700 duration-200 transition-colors rounded-full"
          onClick={() => navigate(navigateLink)}
        >
          {children}
        </button>
      </span>
    </Tooltip>
  );
};

export default EditNavigateButton;
