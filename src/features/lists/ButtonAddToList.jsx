import { useState } from "react";
import { RiPlayListAddFill } from "react-icons/ri";
import ListsMenu from "./ListsMenu";
import SpinnerMini from "../../ui/SpinnerMini";
import { useItemStatus } from "./useItemStatus";

const ButtonAddToList = ({ ...props }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isLoading } = useItemStatus();

  return (
    <>
      <button
        disabled={isLoading}
        className="bg-slate-700 md:w-[100px] sm:w-[92px] w-[85px] py-2 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-500"
        onClick={() => {
          setIsPopupOpen(true);
        }}
      >
        {isLoading ? (
          <SpinnerMini iconSize="md:text-3xl sm:text-xl text-base" />
        ) : (
          <RiPlayListAddFill className="text-slate-200 md:text-3xl sm:text-xl text-base" />
        )}
      </button>

      {isPopupOpen && (
        <ListsMenu
          setIsPopupOpen={setIsPopupOpen}
          isPopupOpen={isPopupOpen}
          otherProps={{ ...props }}
        />
      )}
    </>
  );
};

export default ButtonAddToList;
