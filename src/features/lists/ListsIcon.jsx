import { useState } from "react";
import { RiPlayListAddFill } from "react-icons/ri";
import ListsMenu from "./ListsMenu";

const ListsIcon = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <RiPlayListAddFill
        className="text-5xl text-slate-200 hover:text-orange-amber cursor-pointer duration-300 transition-colors ease-linear"
        onClick={() => setIsPopupOpen(true)}
      />
      {isPopupOpen && (
        <ListsMenu setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen} />
      )}
    </div>
  );
};

export default ListsIcon;
