import { useEffect, useRef } from "react";
import SpinnerMini from "./SpinnerMini";

const DeleteListConfirm = ({
  onClose,
  onDelete,
  type,
  name = "",
  isDeleting = false,
}) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
      disabled
    >
      <div
        className="fixed z-[100] w-[600px] bg-gray-800 rounded-lg shadow-xl  mx-auto py-6 px-20 text-center"
        ref={popupRef}
      >
        <h3 className="text-lg font-semibold ">
          {type === "deleteItem" && "Delete Item"}
          {type === "deleteList" && "Delete List"}
          {type === "deleteReview" && "Delete Review"}
        </h3>
        <p>
          Are you sure you want to delete{" "}
          {type === "DeleteItem" &&
            `${(
              <span className="font-semibold text-red-500">{name}</span>
            )} from  this list`}
          {type === "DeleteList" &&
            `the list 
            ${(<span className="font-semibold text-red-500">{name}</span>)}`}
          {type === "deleteReview" && "this review"}? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 w-[100px] bg-slate-300 text-gray-800 rounded-lg hover:bg-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className=" px-4 py-2 w-[100px] bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center"
          >
            {isDeleting ? <SpinnerMini size={24} /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteListConfirm;
