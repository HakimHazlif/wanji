import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useLists } from "../features/lists/useLists";

import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";
import { bgPopcorn } from "../assets/icons";
import ListView from "../components/ListView";
import CreateListButton from "../ui/CreateListButton";
import CustomLists from "../ui/CustomLists";
import EditListButton from "../components/EditListButton";
import { IoIosArrowBack } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import EditingDescription from "../components/EditingDescription";
import EditButton from "../components/EditButton";
import { ImPencil } from "react-icons/im";
import AddingSearchBar from "../components/AddingSearchbar";
import EditingName from "../components/EditingName";
import HeaderBackDrop from "../ui/HeaderBackDrop";

const List = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { username } = user;
  const { list } = useParams();
  const location = useLocation();

  const { watchlist, favoriteList, remainLists } = useLists();

  const searchParams = new URLSearchParams(location.search);
  const selectedListId = searchParams.get("listId");
  const isListsPage = list === "Lists" && !selectedListId;

  const targetList = useMemo(() => {
    if (list === "Watchlist") return watchlist;
    else if (list === "Favorites") return favoriteList;
    if (list === "Lists" && selectedListId) {
      const customList = remainLists?.find(
        (list) => list.id === selectedListId
      );
      return customList;
    }
    return null;
  }, [list, remainLists, watchlist, favoriteList, selectedListId]);

  const listData = useMemo(() => {
    if (list === "Lists" && !selectedListId)
      return {
        listId: null,
        createdDate: null,
        listName: list,
        description:
          "Create and customize lists to organize your movies and TV shows however you like. Whether by genre, mood, or theme, these lists give you full control over curating and managing your collection.",
      };

    return {
      listId: targetList?.id,
      createdDate: targetList?.created_at,
      listName: targetList?.name || "Custom List",
      description: targetList?.description,
    };
  }, [
    list,
    targetList?.id,
    targetList?.created_at,
    selectedListId,
    targetList?.description,
    targetList?.name,
  ]);

  const { listId, createdDate, listName, description } = listData;

  return (
    <main className="padding-x py-32 w-full">
      <HeaderBackDrop backdrop={bgPopcorn} alt="backdrop" height="h-[400px]" />

      <section className="mb-20 flex items-end justify-between">
        <div className="w-3/5">
          {list === "Watchlist" || list === "Favorites" || isListsPage ? (
            <h2 className="font-bold text-5xl mb-5">
              {!selectedListId && "My"} {listName}
            </h2>
          ) : (
            <EditingName list={targetList} />
          )}

          <div className="flex gap-1 font-semibold">
            {createdDate && (
              <p className="">
                Created{" "}
                <span className="">{formatDistanceToNow(createdDate)}</span> ago
              </p>
            )}
            <p>
              by{" "}
              <Link
                to={`/u/${username}`}
                className="font-bold text-orange-amber"
              >
                {username}
              </Link>
            </p>
          </div>

          {list === "Watchlist" || list === "Favorites" || isListsPage ? (
            <p className="font-sembold text-xl text-gray-300 mt-5">
              {description}
            </p>
          ) : (
            <div className="font-sembold text-xl text-gray-300 mt-5">
              <EditingDescription list={targetList} />
            </div>
          )}
        </div>
        <div className="">
          <CreateListButton />
        </div>
      </section>

      {!isListsPage && (
        <div className="mb-20 flex gap-5 items-center">
          <AddingSearchBar list={targetList} />
        </div>
      )}

      {isListsPage ? <CustomLists /> : <ListView targetList={targetList} />}
    </main>
  );
};

export default List;
