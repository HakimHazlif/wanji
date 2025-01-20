import { BiHeart } from "react-icons/bi";
import { useLists } from "../features/lists/useLists";
import { FaListUl } from "react-icons/fa";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Lists = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const list = searchParams.get("list");

  const { remainLists, watchlist, favoriteList } = useLists();

  console.log(watchlist);

  return (
    <section className="padding-x py-32">
      <section className="border-b border-slate-600 py-2">
        <div defaultValue="watchlist" className="w-full">
          <div className="h-auto p-1 w-full flex flex-wrap justify-start gap-1">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full hover:bg-bluish-black duration-150 transition-colors ${
                list === "watchlist" && "bg-bluish-black"
              }`}
              onClick={() =>
                navigate(`/u/${user.username}/lists?list=watchlist`)
              }
            >
              <BsBookmarkCheckFill className="w-4 h-4 text-orange-amber" />
              Watchlist
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full hover:bg-bluish-black  duration-150 transition-colors ${
                list === "favorites" && "bg-bluish-black"
              }`}
              onClick={() =>
                navigate(`/u/${user.username}/lists?list=favorites`)
              }
            >
              <IoIosHeart className="w-4 h-4 text-strawberry" />
              Favorites
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full hover:bg-bluish-black duration-150 transition-colors ${
                list === "custom-list" && "bg-bluish-black"
              }`}
              onClick={() =>
                navigate(`/u/${user.username}/lists?list=custom-list`)
              }
            >
              <FaListUl className="w-4 h-4 text-orange-coral" />
              My Lists
            </button>
          </div>
        </div>
      </section>
      <section></section>
    </section>
  );
};

export default Lists;
