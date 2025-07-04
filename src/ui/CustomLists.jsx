import { useLists } from "../features/userLists/hooks/useLists";
import CreateListButton from "./CreateListButton";
import { FaFolderOpen } from "react-icons/fa";
import CustomListCard from "./CustomListCard";
import { useMemo } from "react";
import { useListContext } from "../context/ListContext";
import Selector from "./Selector";
import { listsSortOptions } from "../features/userLists/constant/options";
import MiniMultiRadio from "../components/MiniMultiRadio";
import { BiSort } from "react-icons/bi";

const CustomLists = () => {
  const { remainLists } = useLists();
  const { listsSortOption, handleSelectListsSort } = useListContext();

  // const [isOpen, setIOpen] = useState(false);
  // const sortOptions = [
  //   "Date Created (Newest)",
  //   "Date Created (Oldest)",
  //   "Number of Titles (Most)",
  //   "Number of Titles (Fewest)",
  //   "Alphabetical (A-Z)",
  //   "Alphabetical (Z-A)",
  // ];
  // const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  // function handleSelectOption(selectedOption) {
  //   setSelectedOption(selectedOption);
  // }

  const newList = useMemo(() => {
    const newList = remainLists?.sort((a, b) => {
      switch (listsSortOption) {
        case "Date Created (Newest)":
          return new Date(b.created_at) - new Date(a.created_at);
        case "Date Created (Oldest)":
          return new Date(a.created_at) - new Date(b.created_at);
        case "Number of Titles (Most)":
          return b.items_list.length - a.items_list.length;
        case "Number of Titles (Fewest)":
          return a.items_list.length - b.items_list.length;
        case "Alphabetical (A-Z)":
          return a.name.localeCompare(b.name);
        case "Alphabetical (Z-A)":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return newList;
  }, [remainLists, listsSortOption]);

  const sortGroups = [
    {
      header: "Sort by",
      value: listsSortOption,
      onChange: handleSelectListsSort,
      options: listsSortOptions,
    },
  ];

  if (remainLists?.length < 1 || !remainLists)
    return (
      <section className="flex flex-col gap-6 text-center justify-center items-center p-6 bg-bluish-black rounded-lg min-h-[300px] mt-10 ">
        <div className="flex flex-col justify-center items-center ">
          <FaFolderOpen className="mx-auto mb-4 w-16 h-16 text-gray-400" />

          <p className="text-gray-300 mb-10 text-lg">
            You haven&#39;t created a list yet. Start by creating your first
            list to explore items!
          </p>
          <CreateListButton />
        </div>
      </section>
    );

  return (
    <section className="w-full space-y-4 p-4 mt-2">
      <div className="flex justify-between items-center mb-10 border-b border-slate-600 pb-5">
        <div>
          <h3 className="flex items-center justify-center gap-2 bg-bluish-black text-gray-400 text-lg px-5 py-2 rounded-full w-[140px] font-bold">
            <FaFolderOpen />
            {remainLists?.length} {remainLists?.length <= 1 ? "list" : "lists"}
          </h3>
        </div>

        <div className="md:flex hidden items-center lg:gap-4 gap-2">
          <Selector
            value={listsSortOption}
            onChange={handleSelectListsSort}
            options={listsSortOptions}
          />
        </div>

        <div className="md:hidden flex items-center md:gap-4 gap-2">
          <div className="w-9 h-9 rounded-full flex justify-center items-center bg-bluish-black hover:bg-bluish-black/50">
            <MiniMultiRadio radioGroups={sortGroups}>
              <BiSort size={22} />
            </MiniMultiRadio>
          </div>
        </div>
      </div>
      <ul className="grid md:grid-cols-2 grid-cols-1 grid-flow-row gap-4">
        {newList?.map((list) => (
          <CustomListCard key={list.id} list={list} />
        ))}
      </ul>
    </section>
  );
};

export default CustomLists;
