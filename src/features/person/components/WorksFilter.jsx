import RadioGroup from "../../../ui/RadioGroup";
import { activeTabs, departmentOptions } from "../utils/constants";
import { usePersonWorksContext } from "../../../context/PersonWorksContext";
import DropPopup from "../../../ui/DropPopup";

const WorksFilter = ({ buttonRef, onClose }) => {
  const { activeTab, handleChangeTab, departmentFilter, handleChangeFilter } =
    usePersonWorksContext();

  return (
    <DropPopup buttonRef={buttonRef} onClose={onClose}>
      <div className="mb-4">
        <RadioGroup
          header="Category"
          value={activeTab}
          onChange={(e) => {
            onClose();
            handleChangeTab(e);
          }}
          options={activeTabs}
        />
      </div>
      <div>
        <RadioGroup
          header="Departments"
          value={departmentFilter}
          onChange={(e) => {
            onClose();
            handleChangeFilter(e);
          }}
          options={departmentOptions}
        />
      </div>
    </DropPopup>
  );
};

export default WorksFilter;
