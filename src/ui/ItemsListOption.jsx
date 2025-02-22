import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FaEdit, FaListUl, FaPlus } from "react-icons/fa";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

const ItemsListOption = ({
  list,
  setIsOptionOpen,
  isAdded,
  addToList,
  deleteFromList,
  setForConfirmDelete,
  buttonRef,
}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const popupRef = useRef();

  const [position, setPositon] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const wouldOverflowBottom = rect.bottom + 160 > window.innerHeight;

      setPositon({
        top: wouldOverflowBottom ? rect.bottom - 195 : rect.bottom + 10,
        right: rect.right - 510,
      });
    }

    const handleScroll = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();

        const wouldOverflowBottom = rect.bottom + 160 > window.innerHeight;

        setPositon({
          top: wouldOverflowBottom ? rect.bottom - 195 : rect.bottom + 10,
          right: rect.right - 510,
        });
      }
    };

    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOptionOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    // window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      // window.removeEventListener("resize", handleScroll);
    };
  }, [buttonRef, setIsOptionOpen]);

  return (
    <div
      className="fixed z-40 "
      style={{ top: `${position.top}px`, right: `${position.right}px` }}
    >
      <ul
        className="bg-slate-600 rounded-md w-[200px] text-start "
        ref={popupRef}
      >
        <li
          onClick={() => {
            if (isAdded) deleteFromList();
            else addToList();
          }}
          className="w-full py-2 px-5 flex items-center gap-3 text-base hover:bg-slate-800 cursor-pointer"
        >
          {isAdded ? (
            <MdOutlineRemoveCircleOutline className="w-6 h-6" />
          ) : (
            <FaPlus className="w-5 h-5" />
          )}
          <span>{isAdded ? "Remove from list" : "Add to list"}</span>
        </li>
        <li
          onClick={() =>
            navigate(
              `/u/${user.username.replace(" ", "-")}/Lists?listId=${list.id}`
            )
          }
          className="w-full py-2 px-5 flex items-center gap-3 text-base hover:bg-slate-800 cursor-pointer"
        >
          <FaListUl className="w-5 h-5" />

          <span>Go to list</span>
        </li>
        <li className="w-full py-2 px-5 flex items-center gap-3 text-base hover:bg-slate-800 cursor-pointer">
          <FaEdit className="w-5 h-5" />
          <span>Edit list</span>
        </li>
        <li
          onClick={() => {
            setForConfirmDelete(true);
          }}
          className="w-full py-2 px-5 flex items-center gap-3 text-base hover:bg-slate-800 cursor-pointer"
        >
          <RiDeleteBin2Fill className="w-6 h-6" />
          <span>Remove list</span>
        </li>
      </ul>
    </div>
  );
};

export default ItemsListOption;
