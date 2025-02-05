import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import { useLists } from "../features/lists/useLists";

import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";
import { bgPopcorn } from "../assets/icons";
import ListView from "../components/ListView";
import CreateListButton from "../ui/CreateListButton";
import CustomLists from "../ui/CustomLists";
import EditListButton from "../components/EditListButton";

const List = () => {
  const { user } = useSelector((state) => state.user);
  const { username } = user;
  const { list } = useParams();
  const location = useLocation();

  const { watchlist, favoriteList, remainLists } = useLists();

  const searchParams = new URLSearchParams(location.search);
  const selectedListId = searchParams.get("listId");

  const targetList = useMemo(() => {
    if (list === "Lists" && selectedListId) {
      const customList = remainLists?.find(
        (list) => list.id === selectedListId
      );
      return customList;
    }
    return null;
  }, [list, remainLists, selectedListId]);

  const createdDate = useMemo(() => {
    let createdAt;
    if (list === "Watchlist") createdAt = watchlist?.created_at;
    else if (list === "Favorites") createdAt = favoriteList?.created_at;
    else if (list === "Lists" && selectedListId) targetList?.created_at;

    return createdAt;
  }, [
    list,
    watchlist?.created_at,
    favoriteList?.created_at,
    selectedListId,
    targetList?.created_at,
  ]);

  const listName = useMemo(() => {
    if (list === "Watchlist" || list === "Favorites") return list;
    if (list === "Lists" && selectedListId)
      return targetList?.name || "Custom List";

    return list;
  }, [list, selectedListId, targetList?.name]);

  const description = useMemo(() => {
    if (list === "Watchlist") return watchlist?.description;
    else if (list === "Favorites") return favoriteList?.description;
    else if (list === "Lists" && selectedListId) return targetList?.description;
    else if (list === "Lists" && !selectedListId)
      return "Create and customize lists to organize your movies and TV shows however you like. Whether by genre, mood, or theme, these lists give you full control over curating and managing your collection.";

    return null;
  }, [
    list,
    targetList?.description,
    selectedListId,
    watchlist?.description,
    favoriteList?.description,
  ]);

  return (
    <main className="padding-x py-32 w-full">
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={bgPopcorn}
          alt="backdrop of movie"
          className="h-[400px] w-full object-cover object-center masking"
        />
        <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>

      <section className="w-full mb-20 flex justify-between items-center gap-20">
        <div>
          <div>
            <h2 className="font-bold text-4xl mb-5">
              {!selectedListId && "My"} {listName}
            </h2>
          </div>

          <div className="flex items-center gap-14">
            <div className="flex gap-1 font-semibold">
              {createdDate && (
                <p className="">
                  Created{" "}
                  <span className="">{formatDistanceToNow(createdDate)}</span>{" "}
                  ago
                </p>
              )}
              <p>
                by{" "}
                <Link to={`/u/${username}`} className="font-bold text-blue-700">
                  {username}
                </Link>
              </p>
            </div>
            {list === "Lists" && selectedListId && (
              <div>
                <EditListButton listId={selectedListId} />
              </div>
            )}
          </div>
          <p className="mt-10 w-full">{description}</p>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <CreateListButton />
        </div>
      </section>

      {list === "Watchlist" && (
        <div>
          <ListView targetList={watchlist} />
        </div>
      )}
      {list === "Favorites" && (
        <div>
          <ListView targetList={favoriteList} />
        </div>
      )}
      {list === "Lists" && !selectedListId && <CustomLists />}
      {list === "Lists" && selectedListId && (
        <div>
          <ListView targetList={targetList} />
        </div>
      )}
    </main>
  );
};

export default List;
