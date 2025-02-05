import { Tooltip } from "@mui/material";
import { ImPencil } from "react-icons/im";

const EditButton = ({ handleEdit, title, children = null }) => {
  return (
    <Tooltip title={title}>
      <span>
        <button onClick={handleEdit} className="px-3 py-1 flex gap-3">
          {children}
        </button>
      </span>
    </Tooltip>
  );
};

export default EditButton;
