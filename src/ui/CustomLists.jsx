import { useNavigate, useSearchParams } from "react-router";
import { useLists } from "../features/lists/useLists";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import ShowCard from "./ShowCard";

const CustomLists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  function handleNavigate(newListId) {
    searchParams.set("listId", newListId);
    setSearchParams(searchParams);
  }

  const { remainLists } = useLists();

  const targetList = remainLists.filter((list) => list.id === listId)?.[0]
    ?.items_list;

  return (
    <div className="w-full ">
      <div className="h-auto grid grid-flow-col gap-2 justify-start">
        {remainLists.map((list) => (
          <button
            className={`flex items-center gap-1 px-4 py-2 rounded-full hover:bg-bluish-black duration-150 transition-colors font-bold text-lg ${
              listId === list.id ? "bg-bluish-black" : "bg-gray-700"
            }`}
            key={list.id}
            onClick={() => handleNavigate(list.id)}
          >
            <p>
              {list.name}{" "}
              <span className="text-sm font-medium text-slate-500">
                ({list.items_list.length}{" "}
                {list.items_list.length > 1 ? "titles" : "title"})
              </span>
            </p>
            <div className="text-xl">
              <IoIosArrowForward
                className={`transform transition-transform duration-200 ${
                  listId === list.id ? "rotate-90" : "rotate-0"
                }`}
              />
            </div>
          </button>
        ))}
      </div>
      {targetList && (
        <div className="grid grid-cols-4 gap-10 py-14">
          {targetList.map((item) => (
            <ShowCard
              show={item}
              key={item.item_id}
              additions={false}
              category={item.type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomLists;
