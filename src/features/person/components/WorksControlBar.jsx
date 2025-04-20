import { IoFilter } from "react-icons/io5";
import Selector from "../../../ui/Selector";
import {
  activeTabs,
  departmentOptions,
  sortPersonWorks,
} from "../utils/constants";
import { usePersonWorksContext } from "../../../context/PersonWorksContext";
import { BiSort } from "react-icons/bi";
import MiniMultiRadio from "../../../components/MiniMultiRadio";

const WorksControlBar = () => {
  const {
    activeTab,
    handleChangeTab,
    departmentFilter,
    handleChangeFilter,
    sortBy,
    handleChangeSort,
  } = usePersonWorksContext();

  const filterGroups = [
    {
      header: "Category",
      value: activeTab,
      onChange: handleChangeTab,
      options: activeTabs,
    },
    {
      header: "Departments",
      value: departmentFilter,
      onChange: handleChangeFilter,
      options: departmentOptions,
    },
  ];

  const sortGroups = [
    {
      header: "Sort by",
      value: sortBy,
      onChange: handleChangeSort,
      options: sortPersonWorks,
    },
  ];

  return (
    <div className="flex justify-between items-center gap-4 border-b border-slate-700 pb-3">
      <h2 className="text-2xl font-bold">Credits:</h2>

      <div className="sm:flex gap-4 hidden">
        <Selector
          value={activeTab}
          onChange={handleChangeTab}
          options={activeTabs}
        />

        <Selector
          value={departmentFilter}
          onChange={handleChangeFilter}
          options={departmentOptions}
        />

        <Selector
          value={sortBy}
          onChange={handleChangeSort}
          options={sortPersonWorks}
        />
      </div>

      <div className="sm:hidden flex gap-4">
        <MiniMultiRadio radioGroups={filterGroups}>
          <IoFilter size={22} />
        </MiniMultiRadio>

        <MiniMultiRadio radioGroups={sortGroups}>
          <BiSort size={22} />
        </MiniMultiRadio>
      </div>
    </div>
  );
};

export default WorksControlBar;
