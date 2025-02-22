import { useQuery } from "react-query";
import { getTvShows } from "../../services/apiShows";
import { useItemsStatus } from "../lists/useItemsStatus";

export function useTvShows() {
  const {
    data: tvShows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tvShows"],
    queryFn: getTvShows,
  });

  const popularTV = tvShows?.popularTv?.slice(0, 8) ?? [];
  const topRatedTV = tvShows?.topRatedTv?.slice(0, 8) ?? [];
  const nowPlayingTV = tvShows?.onTheAir?.slice(0, 8) ?? [];
  const airingTodayTV = tvShows?.airingToday?.slice(0, 8) ?? [];

  const allShows = [
    ...popularTV,
    ...topRatedTV,
    ...nowPlayingTV,
    ...airingTodayTV,
  ];

  const uniqueTvShows = Array.from(
    new Map(allShows.map((show) => [`${show.id}`, show.id])).values()
  );

  const { isLoading: isFeaturesLoading } = useItemsStatus(
    uniqueTvShows.length ? uniqueTvShows : null,
    "tv"
  );

  return { isLoading, isFeaturesLoading, error, tvShows };
}
