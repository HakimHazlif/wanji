import RadioGroup from "../../../ui/RadioGroup";
import { sortPersonWorks } from "../utils/constants";
import { usePersonWorksContext } from "../../../context/PersonWorksContext";
import DropPopup from "../../../ui/DropPopup";

const WorksFilter = ({ buttonRef, onClose }) => {
  const { sortBy, handleChangeSort } = usePersonWorksContext();

  return (
    <DropPopup buttonRef={buttonRef} onClose={onClose}>
      <div>
        <RadioGroup
          header="Sort by"
          value={sortBy}
          onChange={(e) => {
            onClose();
            handleChangeSort(e);
          }}
          options={sortPersonWorks}
        />
      </div>
    </DropPopup>
  );
};

export default WorksFilter;
