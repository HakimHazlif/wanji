import { useState } from "react";
import { useItemStatus } from "../hooks/useItemStatus";
import SpinnerMini from "../../../ui/SpinnerMini";
import { RiPlayListAddFill } from "react-icons/ri";
import ListsMenu from "../components/ListsMenu";

const AddToListButton = ({ ...props }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isLoading } = useItemStatus();

  return (
    <>
      <button
        disabled={isLoading}
        className="bg-[#0000]/30 backdrop-blur-lg hover:bg-[#0000]/60 ease-linear cursor-pointer hover:scale-105 transition-all duration-300 md:w-[100px] sm:w-[92px] w-[85px] py-2 font-bold rounded-lg flex items-center justify-center gap-2"
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

export default AddToListButton;
