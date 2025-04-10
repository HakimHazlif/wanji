import { useSelector } from "react-redux";
import { useLists } from "../features/lists/useLists";
import { bgPopcorn } from "../assets/icons";
import { Outlet } from "react-router-dom";
import { updateDateFormat } from "../utils/helper";
import UserAvatar from "../ui/UserAvatar";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { username, createdAt } = user;

  const { remainLists, watchlist, favoriteList } = useLists();

  const allShowsOfRemainLists = remainLists?.flatMap((list) => list.items_list);

  const allShows = allShowsOfRemainLists && [
    ...allShowsOfRemainLists,
    ...watchlist.items_list,
    ...favoriteList.items_list,
  ];

  const uniqueShows = Array.from(
    new Map(
      allShows?.map((show) => [`${show.item_id}-${show.type}`, show])
    ).values()
  );

  const moviesNum = uniqueShows.filter((show) => show.type === "movie").length;
  const tvNum = uniqueShows.filter((show) => show.type === "tv").length;
  return (
    <section className="pt-60 padding-x">
      <div className="flex items-end gap-5">
        <UserAvatar size="w-60 h-60" textSize="text-8xl" />

        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-5xl font-bold ">{username}</h1>
          <p className="text-sm font-semibold">
            Member since{" "}
            <span className="text-orange-amber">
              {updateDateFormat(createdAt)}
            </span>
          </p>
          <div className="flex flex-wrap gap-6 text-gray-400">
            <div className="py-3 px-4 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm">
              <span>{moviesNum} Movies</span>
            </div>
            <div className="py-3 px-4 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm">
              <span>{tvNum} TV Shows</span>
            </div>
            <div className="py-3 px-4 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm">
              <span>{remainLists?.length + 2} Lists</span>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={bgPopcorn}
          alt="backdrop of movie"
          className="h-[600px] w-full object-cover object-center masking"
        />
        <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>
    </section>
  );
};

export default UserProfile;
