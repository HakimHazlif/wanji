import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useLists } from "../hooks/useLists";
import { useRatingList } from "../hooks/useRatingList";
import { useMemo } from "react";
import HeaderBackDrop from "../../../ui/HeaderBackDrop";
import { bgPopcorn } from "../../../assets/icons";
import EditingName from "../../../components/EditingName";
import CreatedByAuth from "../../../components/CreatedByAuth";
import AddingSearchBar from "../../../components/AddingSearchbar";
import ListView from "../components/ListView";
import CreateListButton from "../../../ui/CreateListButton";
import CustomLists from "../../../ui/CustomLists";
import EditingDescription from "../../../components/EditingDescription";

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
  }, [list, remainLists, watchlist, favoriteList, selectedListId, ratingList]);

  const listData = useMemo(() => {
    if (list === "Lists" && !selectedListId)
      return {
        listId: null,
        createdDate: null,
        listName: list,
        description:
          "A customizable space to organize your movies and TV shows by genre, mood, theme, or any system that fits your style. Perfect for curating content the way you like.",
      };
    if (list === "Ratings") {
      return {
        listId: null,
        createdDate: null,
        listName: list,
        description:
          "A space to record your personal ratings for movies, shows and episodes you've watched. Reflect on what you enjoyed, compare opinions, and build a history of your viewing experience.",
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

  const toNotUpdate =
    list === "Watchlist" ||
    list === "Favorites" ||
    list === "Ratings" ||
    isListsPage;

  return (
    <main className="padding-x py-32 w-full">
      <HeaderBackDrop backdrop={bgPopcorn} alt="backdrop" height="h-[400px]" />

      <section className="mb-20 flex md:flex-row flex-col md:items-end items-start gap-5 gap-y-10 justify-between">
        <div className="md:w-3/5 w-full">
          {toNotUpdate ? (
            <h2 className="font-bold md:text-5xl sm:text-4xl text-3xl mb-5">
              {!selectedListId && "My"} {listName}
            </h2>
          ) : (
            <EditingName list={targetList} />
          )}

          <CreatedByAuth createdDate={createdDate} username={username} />

          {toNotUpdate ? (
            <p className="font-sembold md:text-xl sm:text-lg text-base text-gray-300 mt-5">
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

      {!isListsPage && list !== "Ratings" && (
        <div className="mb-20 flex gap-5 items-center">
          <AddingSearchBar list={targetList} />
        </div>
      )}

      {isListsPage ? <CustomLists /> : <ListView targetList={targetList} />}
    </main>
  );
};

export default List;
