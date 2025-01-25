import { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router";

const ListOptionButton = ({ addToList, deleteFromList, isAdded }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target))
        setOpenPopup(false);
    }

    if (openPopup) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenPopup, openPopup]);

  return (
    <div className="relative">
      <button onClick={() => setOpenPopup((prev) => !prev)}>
        <SlOptionsVertical className="text-slate-400" />
      </button>
      {openPopup && (
        <ul
          ref={popupRef}
          className="w-[200px] h-[110px] absolute z-50 top-full right-0 bg-slate-800 rounded-lg grid items-center justify-start px-2"
        >
          <li className="cursor-pointer">
            {isAdded ? (
              <button
                onClick={() => {
                  deleteFromList();
                  setOpenPopup(false);
                }}
              >
                Remove from the list
              </button>
            ) : (
              <button
                onClick={() => {
                  addToList();
                  setOpenPopup(false);
                }}
              >
                Add to the list
              </button>
            )}
          </li>

          <li className="cursor-pointer">
            <Link to={`/`}>Go to the list</Link>
          </li>
          <li className="cursor-pointer">Remove the list</li>
        </ul>
      )}
    </div>
  );
};

export default ListOptionButton;
