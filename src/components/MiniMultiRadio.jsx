import { useRef, useState } from "react";
import MultiRadioPopup from "./MultiRadioPopup";

// const RadioGroups = [
//   {
//     header: "Category",
//     value: activeTab,
//     onChange: () => {
//       onClose();
//       handleChangeTab(e);
//     },
//     options: activeTabs,
//   },
// ];

const MiniMultiRadio = ({ children, radioGroups }) => {
  const [isDrop, setIsDrop] = useState(false);

  const buttonRef = useRef(null);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();

          setIsDrop((prev) => !prev);
        }}
        ref={buttonRef}
        className="flex justify-center items-center"
      >
        {children}
      </button>
      {isDrop && (
        <MultiRadioPopup
          onClose={() => setIsDrop(false)}
          buttonRef={buttonRef}
          radioGroups={radioGroups}
        />
      )}
    </div>
  );
};

export default MiniMultiRadio;
