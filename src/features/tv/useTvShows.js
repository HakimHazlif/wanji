import { useQuery } from "react-query";
import { getTvShows } from "../../services/apiShows";
import { useItemsStatus } from "../lists/useItemsStatus";
import { useMemo } from "react";

export function useTvShows() {
  const {
    data: tvShows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tvShows"],
    queryFn: getTvShows,
  });

  // const tvShowsSet = useMemo(() => {
  //   const popularTv = tvShows?.popularTv?.slice(0, 8) ?? [];
  //   const topRatedTv = tvShows?.topRatedTv?.slice(0, 8) ?? [];
  //   const onTheAir = tvShows?.onTheAir?.slice(0, 8) ?? [];
  //   const airingTodayTV = tvShows?.airingToday?.slice(0, 8) ?? [];

  //   return Array.from(
  //     new Set(
  //       [...popularTv, ...topRatedTv, ...onTheAir, ...airingTodayTV].map(
  //         (show) => show.id
  //       )
  //     )
  //   );
  // }, [
  //   tvShows?.airingToday,
  //   tvShows?.onTheAir,
  //   tvShows?.topRatedTv,
  //   tvShows?.popularTv,
  // ]);

  // const { isLoading: isFeaturesLoading } = useItemsStatus(
  //   tvShowsSet.length ? tvShowsSet : null,
  //   "tv"
  // );

  return {
    isLoading,
    error,
    tvShows,
  };
}
