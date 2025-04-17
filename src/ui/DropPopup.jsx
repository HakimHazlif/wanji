import { useEffect, useRef } from "react";

const DropPopup = ({ children, buttonRef, onClose }) => {
  const dropRef = useRef(null);

  useEffect(() => {
    function handleDropMenu(e) {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      )
        onClose();
    }

    document.addEventListener("mousedown", handleDropMenu);

    return () => document.removeEventListener("mousedown", handleDropMenu);
  }, [dropRef, onClose, buttonRef]);

  return (
    <div
      className="py-3 px-4 absolute z-40 top-full right-0 bg-slate-800 rounded-md"
      ref={dropRef}
    >
      {children}
    </div>
  );
};

export default DropPopup;
