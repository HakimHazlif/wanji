import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaEdit, FaListUl, FaPlus } from "react-icons/fa";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import ItemsListOption from "./ItemsListOption";

const ItemsListOptions = ({
  list,
  setIsOptionOpen,
  isAdded,
  addToList,
  deleteFromList,
  setForConfirmDelete,
  buttonRef,
}) => {
  const { transitionNavigate } = useTransitionNavigate();
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
        className="bg-slate-700 rounded-md w-[200px] text-start shadow-lg overflow-hidden"
        ref={popupRef}
      >
        <ItemsListOption
          handleOption={() => {
            if (isAdded) deleteFromList();
            else addToList();
          }}
          icon={
            isAdded ? (
              <MdOutlineRemoveCircleOutline className="w-6 h-6" />
            ) : (
              <FaPlus className="w-5 h-5" />
            )
          }
          option={isAdded ? "Remove from list" : "Add to list"}
        />
        <ItemsListOption
          handleOption={() =>
            transitionNavigate(
              `/u/${user.username.replace(" ", "-")}/Lists?listId=${list.id}`
            )
          }
          icon={<FaListUl className="w-5 h-5" />}
          option="Go to list"
        />

        <ItemsListOption
          handleOption={() =>
            transitionNavigate(
              `/u/${user.username.replace(" ", "-")}/list/${list.id}/edit`
            )
          }
          icon={<FaEdit className="w-5 h-5" />}
          option="Edit list"
        />

        <ItemsListOption
          handleOption={() => {
            setForConfirmDelete(true);
          }}
          icon={<RiDeleteBin2Fill className="w-6 h-6" />}
          option="Remove list"
        />
      </ul>
    </div>
  );
};

export default ItemsListOptions;
