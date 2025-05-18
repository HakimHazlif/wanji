import { useQuery } from "react-query";
import { fetchShortList } from "../api/apiUserList";
import { useItemsStatus } from "./useItemsStatus";
import { useState } from "react";
import { useSelector } from "react-redux";

export function useShortList(list, listName) {
  const { uid } = useSelector((state) => state.user.user);
  const [items, setItems] = useState({
    movieIds: [],
    tvIds: [],
    episodeIds: [],
  });

  const { data: shortList, isLoading } = useQuery({
    queryKey: ["shortLists", listName, uid],
    queryFn: () => fetchShortList(list),
    enabled: !!list && list?.length > 0 && !!uid,
    onSuccess: (data) => {
      setItems({
        movieIds: [
          ...new Set(
            data.filter((el) => el["release_date"]).map((el) => el.id)
          ),
        ],
        tvIds: [
          ...new Set(
            data.filter((el) => el["first_air_date"]).map((el) => el.id)
          ),
        ],
        episodeIds: [
          ...new Set(data.filter((el) => el["air_date"]).map((el) => el.id)),
        ],
      });
    },
  });

  const { isLoading: isMovieStatusLoading } = useItemsStatus(
    items.movieIds,
    "movie"
  );
  const { isLoading: isTvStatusLoading } = useItemsStatus(items.tvIds, "tv");
  const { isLoading: isEpisodeStatusLoading } = useItemsStatus(
    items.episodeIds,
    "episode"
  );

  return {
    shortList,
    isLoading:
      isLoading ||
      isEpisodeStatusLoading ||
      isTvStatusLoading ||
      isMovieStatusLoading,
  };
}
