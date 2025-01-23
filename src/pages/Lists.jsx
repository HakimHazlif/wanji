import { useLists } from "../features/lists/useLists";
import { FaListUl } from "react-icons/fa";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import { useSearchParams } from "react-router";

import CustomLists from "../ui/CustomLists";
import ListView from "../components/ListView";
import { useEffect } from "react";

const Lists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const list = searchParams.get("list");

  const { remainLists, watchlist, favoriteList } = useLists();

  function handleNavigate(newList, newListId) {
    searchParams.set("list", newList);
    searchParams.set("listId", newListId);

    setSearchParams(searchParams);
  }

  const mediaLists = [
    {
      keyword: "watchlist",
      title: "Watchlist",
      icon: <BsBookmarkCheckFill />,
      iconColor: "text-orange-amber",
      listNum: watchlist?.items_list?.length,
      itemType: ["titles", "title"],
      handleClick: () => handleNavigate(`watchlist`, watchlist?.id),
    },
    {
      keyword: "favorites",
      title: "Favorites",
      icon: <IoIosHeart />,
      iconColor: "text-strawberry",
      listNum: favoriteList?.items_list?.length,
      itemType: ["titles", "title"],
      handleClick: () => handleNavigate(`favorites`, favoriteList?.id),
    },
    {
      keyword: "my-lists",
      title: "My lists",
      icon: <FaListUl />,
      iconColor: "text-orange-coral",
      listNum: remainLists?.length,
      itemType: ["lists", "list"],
      handleClick: () => handleNavigate(`my-lists`, remainLists?.[0]?.id),
    },
  ];

  useEffect(() => {
    const newListId = list === "watchlist" ? watchlist?.id : favoriteList?.id;
    handleNavigate(list, newListId);
  }, [list]);

  return (
    <section className="padding-x py-32">
      <section className="border-b border-slate-600 py-2">
        <div className="w-full flex justify-between items-center">
          <div className="h-auto w-full flex flex-wrap justify-start gap-2">
            {mediaLists.map((item, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-full hover:bg-bluish-black duration-150 transition-colors text-xl font-bold ${
                  list === item.keyword && "bg-bluish-black"
                }`}
                onClick={item.handleClick}
              >
                <div
                  className={`w-6 h-6 flex items-center ${
                    list === item.keyword ? item.iconColor : "text-slate-300"
                  }`}
                >
                  {item.icon}
                </div>

                <p>
                  {item.title}{" "}
                  <span className="text-sm text-slate-500 font-medium">
                    ({item.listNum}{" "}
                    {item.listNum > 1 ? item.itemType[0] : item.itemType[1]})
                  </span>
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-4">
        {list === "my-lists" && <CustomLists />}
      </section>
      <ListView />
    </section>
  );
};

export default Lists;
