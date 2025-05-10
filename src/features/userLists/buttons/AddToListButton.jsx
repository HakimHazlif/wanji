import { useState } from "react";
import { RiPlayListAddFill } from "react-icons/ri";
import ListsMenu from "../components/ListsMenu";
import { useSession } from "../../../context/SessionContext";

const AddToListButton = ({
  iconSize = "md:text-xl sm:text-lg text-base",
  width = "md:w-[100px] sm:w-[92px] w-[85px]",
  ...props
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { handleLoginAction } = useSession();

  return (
    <>
      <button
        className={`bg-[#0000]/30 backdrop-blur-lg hover:bg-[#0000]/60 ease-linear cursor-pointer hover:scale-105 transition-all duration-300 py-2 font-bold rounded-lg flex items-center  justify-center gap-2 ${width}`}
        onClick={() => {
          handleLoginAction(() => setIsPopupOpen(true));
        }}
      >
        <RiPlayListAddFill className={`text-slate-200 ${iconSize}`} />
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
