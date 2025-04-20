import DropPopup from "../ui/DropPopup";
import RadioGroup from "../ui/RadioGroup";

const MultiRadioPopup = ({ buttonRef, onClose, radioGroups }) => {
  return (
    <DropPopup buttonRef={buttonRef} onClose={onClose}>
      {radioGroups.map((group, index) => (
        <div
          key={index}
          className={index !== radioGroups.lenght - 1 ? "mb-4" : ""}
        >
          <RadioGroup
            header={group.header}
            value={group.value}
            onChange={group.onChange}
            onClose={onClose}
            options={group.options}
          />
        </div>
      ))}
    </DropPopup>
  );
};

export default MultiRadioPopup;
