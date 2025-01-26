import { useEffect, useRef } from "react";

const DeleteListConfirm = ({ onClose, onDelete, listName }) => {
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
        <h3 className="text-lg font-semibold ">Delete List</h3>
        <p className="mt-4 text-gray-400">
          Are you sure you want to delete the list{" "}
          <span className="font-semibold text-red-500">{listName}</span>? This
          action cannot be undone.
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
            className="px-4 py-2 w-[100px] bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteListConfirm;
