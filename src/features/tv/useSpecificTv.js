import { useQuery } from "react-query";
import { useSearchParams } from "react-router";
import { getTvByList } from "../../services/apiShows";

export function useSpecificTv(id) {
  const [searchParams] = useSearchParams();
  const listName = searchParams.get("tv-tag");
  const page = searchParams.get("page");

  const { data: tvList, isLoading } = useQuery({
    queryKey: ["specificTv", listName, page],
    queryFn: () => getTvByList(listName, page, id),
    enabled: id !== null || id !== undefined,
    onError: (error) => {
      console.log(error);
    },
  });

  return { tvList, isLoading };
}
