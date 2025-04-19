import { useSelector } from "react-redux";
import { useLists } from "../features/userLists/hooks/useLists";
import { updateDateFormat } from "../utils/helper";
import EditNavigateButton from "./EditNavigateButton";
import UserAvatar from "../ui/UserAvatar";
import { useMemo } from "react";
import Stat from "./Stat";

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
    <section className="sm:pt-24 xs:pt-14 pt-4 padding-x">
      <div className="">
        <div className="flex xs:flex-row flex-col items-start  max-xs:justify-center gap-5">
          <div className="flex justify-center max-xs:w-full">
            <UserAvatar
              size="md:w-48 md:h-48 sm:h-44 sm:w-44 w-36 h-36"
              textSize="text-8xl"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold ">
              {username}
            </h1>
            <p className="text-sm font-semibold">
              Member since{" "}
              <span className="text-orange-amber">
                {updateDateFormat(createdAt)}
              </span>
            </p>

            <div className="flex md:flex-row flex-col md:items-center items-start justify-between w-full gap-y-6">
              <div className="flex flex-wrap md:gap-4 gap-2 text-gray-400">
                <Stat>
                  <span>
                    {mediaStat.moviesNum}{" "}
                    {mediaStat.moviesNum <= 1 ? "Movie" : "Movies"}
                  </span>
                </Stat>
                <Stat>
                  <span>
                    {mediaStat.tvNum}{" "}
                    {mediaStat.tvNum <= 1 ? "TV Show" : "TV Shows"}
                  </span>
                </Stat>
                <Stat>
                  <span>{remainLists?.length + 2} Lists</span>
                </Stat>
              </div>
              <EditNavigateButton navigateLink="settings/profile">
                <span className="text-nowrap">Profile Edit</span>
              </EditNavigateButton>
            </div>

            <div className="my-2 md:block hidden">
              <p className="text-gray-300 mb-5">{bio}</p>
            </div>
          </div>
        </div>
        <div className="my-4 md:hidden block ">
          <p className="text-gray-300 mb-5">{bio}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
