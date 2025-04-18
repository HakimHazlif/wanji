import { useSelector } from "react-redux";
import { useLists } from "../features/userLists/hooks/useLists";
import { updateDateFormat } from "../utils/helper";
import EditNavigateButton from "./EditNavigateButton";
import UserAvatar from "../ui/UserAvatar";
import { useMemo } from "react";

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.user);
  const { bio, username, createdAt } = user;

  const { remainLists, watchlist, favoriteList } = useLists();

  const mediaStat = useMemo(() => {
    const allShowsOfRemainLists = remainLists?.flatMap(
      (list) => list.items_list
    );
    const watchlistItems = watchlist?.items_list ?? [];
    const favoriteListItems = favoriteList?.items_list ?? [];

    const allShows = allShowsOfRemainLists && [
      ...allShowsOfRemainLists,
      ...watchlistItems,
      ...favoriteListItems,
    ];

    const uniqueShows = Array.from(
      new Map(
        allShows?.map((show) => [`${show.item_id}-${show.type}`, show])
      ).values()
    );

    const moviesNum =
      uniqueShows?.filter((show) => show.type === "movie")?.length ?? 0;
    const tvNum =
      uniqueShows?.filter((show) => show.type === "tv")?.length ?? 0;

    return {
      moviesNum,
      tvNum,
    };
  }, [remainLists, watchlist?.items_list, favoriteList?.items_list]);

  return (
    <section className="pt-40 padding-x">
      <div className="">
        <div className="flex items-start gap-5">
          <UserAvatar size="w-48 h-48" textSize="text-8xl" />
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-5xl font-bold ">{username}</h1>
            <p className="text-sm font-semibold">
              Member since{" "}
              <span className="text-orange-amber">
                {updateDateFormat(createdAt)}
              </span>
            </p>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-wrap gap-4 text-gray-400">
                <div className="py-3 px-4 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm">
                  <span>
                    {mediaStat.moviesNum}{" "}
                    {mediaStat.moviesNum <= 1 ? "Movie" : "Movies"}
                  </span>
                </div>
                <div className="py-3 px-4 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm">
                  <span>
                    {mediaStat.tvNum}{" "}
                    {mediaStat.tvNum <= 1 ? "TV Show" : "TV Shows"}
                  </span>
                </div>
                <div className="py-3 px-4 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm">
                  <span>{remainLists?.length + 2} Lists</span>
                </div>
              </div>
              <EditNavigateButton navigateLink="settings/profile">
                Profile Edit
              </EditNavigateButton>
            </div>
            <div className="my-2">
              <p className="text-gray-300 mb-5">{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
