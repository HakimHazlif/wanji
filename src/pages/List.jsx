import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import { useLists } from "../features/lists/useLists";

import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";
import { bgPopcorn } from "../assets/icons";
import ListView from "../components/ListView";
import CreateListButton from "../ui/CreateListButton";
import CustomLists from "../ui/CustomLists";

const List = () => {
  const { user } = useSelector((state) => state.user);
  const { username } = user;
  const { list } = useParams();
  const location = useLocation();

  const { watchlist, favoriteList, remainLists } = useLists();

  console.log(list);

  const searchParams = new URLSearchParams(location.search);
  const selectedListId = searchParams.get("listId");

  const createdDate = useMemo(() => {
    let createdAt;
    if (list === "Watchlist") createdAt = watchlist?.created_at;
    else if (list === "Favorites") createdAt = favoriteList?.created_at;
    else if (list === "Lists" && selectedListId) {
      const customList = remainLists?.find(
        (list) => list.id === selectedListId
      );
      createdAt = customList?.created_at;
    }
    console.log(createdAt);

    return createdAt;
  }, [
    list,
    watchlist?.created_at,
    favoriteList?.created_at,
    selectedListId,
    remainLists,
  ]);

  const listName = useMemo(() => {
    if (list === "Watchlist" || list === "Favorites") return list;
    if (list === "Lists" && selectedListId) {
      const customList = remainLists?.find(
        (list) => list.id === selectedListId
      );
      console.log(customList?.name);
      return customList?.name || "Custom List";
    }
    return list;
  }, [list, selectedListId, remainLists]);

  const description = useMemo(() => {
    if (list === "Watchlist") return watchlist?.description;
    else if (list === "Favorites") return favoriteList?.description;
    else if (list === "Lists" && selectedListId) {
      const customList = remainLists?.find(
        (list) => list.id === selectedListId
      );
      console.log(customList?.description);

      return customList?.description;
    } else if (list === "Lists" && !selectedListId) {
      return "Create and customize lists to organize your movies and TV shows however you like. Whether by genre, mood, or theme, these lists give you full control over curating and managing your collection.";
    }
    return null;
  }, [
    list,
    remainLists,
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

      <section className="w-full border-b border-slate-600 pb-8 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-6xl leading-relaxed">
            {!selectedListId && "My"} {listName}
          </h2>
          <div className="flex gap-1 font-semibold">
            {createdDate && (
              <p className="">
                Created{" "}
                <span className="">{formatDistanceToNow(createdDate)}</span> ago
              </p>
            )}
            <p>
              by{" "}
              <Link to={`/u/${username}`} className="font-bold text-blue-700">
                {username}
              </Link>
            </p>
          </div>
          <p className="mt-10 w-4/5">{description}</p>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <CreateListButton />
        </div>
      </section>

      {list === "Watchlist" && (
        <div>
          <ListView listId={watchlist?.id} />
        </div>
      )}
      {list === "Favorites" && (
        <div>
          <ListView listId={favoriteList?.id} />
        </div>
      )}
      {list === "Lists" && !selectedListId && <CustomLists />}
      {list === "Lists" && selectedListId && (
        <div>
          <ListView listId={selectedListId} />
        </div>
      )}
    </main>
  );
};

export default List;
