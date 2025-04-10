import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useLists } from "../features/lists/useLists";
import { useMemo } from "react";
import { bgPopcorn } from "../assets/icons";
import ListView from "../components/ListView";
import CreateListButton from "../ui/CreateListButton";
import CustomLists from "../ui/CustomLists";
import EditingDescription from "../components/EditingDescription";
import AddingSearchBar from "../components/AddingSearchbar";
import EditingName from "../components/EditingName";
import HeaderBackDrop from "../ui/HeaderBackDrop";
import CreatedByAuth from "../components/CreatedByAuth";
import { useRatingList } from "../features/lists/useRatingList";

const List = () => {
  const { user } = useSelector((state) => state.user);
  const { username } = user;
  const { list } = useParams();
  const location = useLocation();

  const { watchlist, favoriteList, remainLists } = useLists();
  const { ratingList } = useRatingList();

  const searchParams = new URLSearchParams(location.search);
  const selectedListId = searchParams.get("listId");
  const isListsPage = list === "Lists" && !selectedListId;

  const targetList = useMemo(() => {
    if (list === "Watchlist") return watchlist;
    else if (list === "Favorites") return favoriteList;
    else if (list === "Ratings") return ratingList;
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
    if (list === "Ratings") {
      return {
        listId: null,
        createdDate: null,
        listName: list,
        description: ".",
      };
    }

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

  const { createdDate, listName, description } = listData;

  return (
    <main className="padding-x py-32 w-full">
      <HeaderBackDrop backdrop={bgPopcorn} alt="backdrop" height="h-[400px]" />

      <section className="mb-20 flex items-end justify-between">
        <div className="w-3/5">
          {list === "Watchlist" ||
          list === "Favorites" ||
          list === "Ratings" ||
          isListsPage ? (
            <h2 className="font-bold text-5xl mb-5">
              {!selectedListId && "My"} {listName}
            </h2>
          ) : (
            <EditingName list={targetList} />
          )}

          <CreatedByAuth createdDate={createdDate} username={username} />

          {list === "Watchlist" ||
          list === "Favorites" ||
          list === "Ratings" ||
          isListsPage ? (
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
