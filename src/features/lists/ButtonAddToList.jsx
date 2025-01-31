import { useState } from "react";
import { RiPlayListAddFill } from "react-icons/ri";
import ListsMenu from "./ListsMenu";
import { Tooltip } from "@mui/material";

const ButtonAddToList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <Tooltip title="Add to new list">
        <span>
          <button className="bg-slate-700 px-4 py-2 w-24 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-500">
            <RiPlayListAddFill
              size={30}
              className="text-slate-200"
              onClick={() => setIsPopupOpen(true)}
            />
          </button>
        </span>
      </Tooltip>

      {isPopupOpen && (
        <ListsMenu setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen} />
      )}
    </div>
  );
};

export default ButtonAddToList;
