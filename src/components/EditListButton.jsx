import { Tooltip } from "@mui/material";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const EditListButton = ({ listId }) => {
  const navigate = useNavigate();
  // const { username } = useSelector((state) => state.user.user);
  return (
    <Tooltip title="Edit List">
      <span>
        <button
          className="flex gap-2 items-center justify-center font-medium py-2 px-5 hover:bg-slate-600 bg-slate-700 duration-200 transition-colors rounded-full"
          onClick={() => navigate(`edit?listId=${listId}`)}
        >
          <FaPencil />
          Edit List
        </button>
      </span>
    </Tooltip>
  );
};

export default EditListButton;
