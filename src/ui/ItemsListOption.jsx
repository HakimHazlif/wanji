import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FaEdit, FaListUl, FaPlus } from "react-icons/fa";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useLists } from "../features/lists/useLists";

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
  const [position, setPosition] = useState(null);
  const [openUpward, setOpenUpward] = useState(false);

  const calculatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const popupHeight = 170;
      const padding = 5;

      const spaceBelow = window.innerHeight - rect.bottom;
      const shouldOpenUpward = spaceBelow < popupHeight;
      setOpenUpward(shouldOpenUpward);

      let topPosition;
      if (shouldOpenUpward) {
        topPosition = rect.top - popupHeight + padding;
      } else {
        topPosition = rect.bottom + padding;
      }

      const rightPosition = window.innerWidth - rect.right - 15;

      setPosition({
        top: Math.max(padding, topPosition),
        right: Math.max(padding, rightPosition),
      });
    }
  };

  useEffect(() => {
    calculatePosition();

    const handleScroll = () => {
      calculatePosition();
    };

    const handleResize = () => {
      calculatePosition();
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
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [buttonRef, setIsOptionOpen]);

  if (!position) {
    return null;
  }

  return (
    <div
      className={`fixed z-40 ${openUpward ? "origin-bottom" : "origin-top"}`}
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
        opacity: 1,
      }}
    >
      <ul
        className="bg-slate-600 rounded-md w-[200px] text-start shadow-lg overflow-hidden"
        ref={popupRef}
      >
        <li
          onClick={() => {
            if (isAdded) deleteFromList();
            else addToList();
          }}
          className="w-full py-2 px-5 flex items-center gap-3 text-base hover:bg-slate-500 transition-colors duration-200 cursor-pointer"
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
          className="w-full py-2 px-5 flex items-center gap-3 text-base hover:bg-slate-500 transition-colors duration-200 cursor-pointer"
        >
          <FaListUl className="w-5 h-5" />
          <span>Go to list</span>
        </li>
        <li className="w-full py-2 px-5 flex items-center gap-3 text-base hover:bg-slate-500 transition-colors duration-200 cursor-pointer">
          <FaEdit className="w-5 h-5" />
          <span>Edit list</span>
        </li>
        <li
          onClick={() => {
            setForConfirmDelete(true);
          }}
          className="w-full py-2 px-5 flex items-center gap-3 text-base hover:bg-slate-500 transition-colors duration-200 cursor-pointer"
        >
          <RiDeleteBin2Fill className="w-6 h-6" />
          <span>Remove list</span>
        </li>
      </ul>
    </div>
  );
};

export default ItemsListOption;
