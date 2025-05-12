import MediaCard from "../../../ui/MediaCard";
import { useFetchInfiniteItems } from "../hooks/useFetchItemsList ";
import Spinner from "../../../ui/Spinner";
import EmptyList from "../../../ui/EmptyList";
import MediaCardRow from "../../../components/MediaCardRow";
import { useDeleteVisualMedia } from "../hooks/useDeleteVisualMedia";
import { useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import LoadMoreButton from "../../../components/LoadMoreButton";
import { useRatingList } from "../hooks/useRatingList";
import { useListContext } from "../../../context/ListContext";
import ListControlBar from "./ListControlBar";
import MediaGrid from "../../../components/MediaGrid";

const ListView = ({ targetList, forEditList = false }) => {
  const queryClient = useQueryClient();
  const { uid } = useSelector((state) => state.user.user);
  const { isGridView, filteredOption, selectedOption } = useListContext();

  const { isLoading: isDeleting, deleteVisualMedia } = useDeleteVisualMedia();
  const { ratingList } = useRatingList();

  const listId = targetList?.id ?? uid;
  const list = targetList?.items_list ?? ratingList;

  const {
    itemsList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFetchInfiniteItems(listId, list);

  function handleDeleteItem(id, type) {
    if (uid) {
      deleteVisualMedia({ id, listId, type });
    }
  }

  const itemsListWithUserRating = useMemo(() => {
    const ratingMap = new Map();

    if (Array.isArray(ratingList)) {
      ratingList?.forEach((ratingItem) => {
        const key = `${ratingItem.item_id}-${ratingItem.type}`;
        ratingMap.set(key, ratingItem.rate);
      });
    }

    const addRating = itemsList?.map((item) => {
      const ratingKey = `${item.id}-${item.media_type}`;
      return {
        ...item,
        user_rating: ratingMap.get(ratingKey) || null,
      };
    });

    return addRating;
  }, [itemsList, ratingList]);

  const filterdList = useMemo(() => {
    switch (filteredOption) {
      case "Movies":
        return itemsListWithUserRating.filter(
          (item) => item.media_type === "movie"
        );
      case "TV Shows":
        return itemsListWithUserRating.filter(
          (item) => item.media_type === "tv"
        );
      case "Episodes":
        return itemsListWithUserRating.filter(
          (item) => item.media_type === "episode"
        );
      default:
        return itemsListWithUserRating;
    }
  }, [filteredOption, itemsListWithUserRating]);

  const sortedList = useMemo(() => {
    const sortedList = filterdList.sort((a, b) => {
      const aReleaseDate = a?.release_date || a?.first_air_date || a?.air_date;
      const bReleaseDate = b?.release_date || b?.first_air_date || b?.air_date;
      const aTitle = a?.title || a?.name;
      const bTitle = b?.title || b?.name;

      switch (selectedOption) {
        case "Date Added (Oldest)":
          return new Date(a.created_at) - new Date(b.created_at);
        case "Date Added (Newest)":
          return new Date(b.created_at) - new Date(a.created_at);
        case "TMDB Rating (Highest)":
          return b.vote_average - a.vote_average;
        case "TMDB Rating (Lowest)":
          return a.vote_average - b.vote_average;
        case "Your Rating (Highest)":
          return b.user_rating - a.user_rating;
        case "Your Rating (Lowest)":
          return a.user_rating - b.user_rating;
        case "Popularity (Highest)":
          return b.popularity - a.popularity;
        case "Popularity (Lowest)":
          return a.popularity - b.popularity;
        case "Release Date (Oldest)":
          return new Date(aReleaseDate) - new Date(bReleaseDate);
        case "Release Date (Newest)":
          return new Date(bReleaseDate) - new Date(aReleaseDate);
        case "Runtime (Longest)":
          return b.runtime - a.runtime;
        case "Runtime (Shortest)":
          return a.runtime - b.runtime;
        case "Alphabetical (A-Z)":
          return aTitle.localeCompare(bTitle);
        case "Alphabetical (Z-A)":
          return bTitle.localeCompare(aTitle);
        default:
          return 0;
      }
    });

    return sortedList;
  }, [filterdList, selectedOption]);

  useEffect(() => {
    const itemsLength = itemsList?.length ?? 0;
    const ListLength = list?.length ?? 0;

    if (itemsLength + 1 === ListLength) {
      fetchNextPage();
    }
    if (itemsLength - 1 === ListLength) {
      queryClient.removeQueries(["itemsList", listId]);
      refetch({ refetchPage: (page, index) => index === 0 });
    }
  }, [
    itemsList?.length,
    list?.length,
    forEditList,
    fetchNextPage,
    listId,
    refetch,
    queryClient,
  ]);

  if (isLoading) return <Spinner />;

  if (!listId || !itemsList || !itemsList?.length || !itemsList[0])
    return <EmptyList />;

  return (
    <section className="mt-5 relative z-10">
      <ListControlBar
        itemsList={itemsList}
        list={list}
        listId={listId}
        forEditList={forEditList}
      />

      <div>
        {sortedList?.length > 0 ? (
          isGridView ? (
            <MediaGrid>
              {sortedList?.length > 0 &&
                sortedList?.map((item, index) => {
                  return (
                    <MediaCard
                      key={item?.id || index}
                      show={item}
                      parentShowId={
                        item?.air_date &&
                        targetList?.length > 0 &&
                        targetList?.filter(
                          (show) => show?.item_id == item?.id
                        )?.[0]?.parent_id
                      }
                      category={
                        item?.title
                          ? "movie"
                          : item?.air_date
                          ? "episode"
                          : "tv"
                      }
                      forEditList={forEditList}
                      deleteVisualMedia={forEditList ? handleDeleteItem : null}
                      isDeleting={isDeleting}
                    />
                  );
                })}
            </MediaGrid>
          ) : (
            <MediaGrid>
              {sortedList?.length > 0 &&
                sortedList?.map((item, index) => {
                  return (
                    <MediaCardRow
                      key={item?.id || index}
                      show={item}
                      parentShowId={
                        item?.air_date &&
                        targetList?.length > 0 &&
                        targetList?.filter(
                          (show) => show?.item_id == item?.id
                        )?.[0]?.parent_id
                      }
                      category={
                        item?.title
                          ? "movie"
                          : item?.air_date
                          ? "episode"
                          : "tv"
                      }
                      forEditList={forEditList}
                      deleteVisualMedia={forEditList ? handleDeleteItem : null}
                      isDeleting={isDeleting}
                    />
                  );
                })}
            </MediaGrid>
          )
        ) : (
          <div className="bg-bluish-black flex justify-center items-center rounded-md w-full h-[200px] mt-8">
            <p className="text-gray-300 font-medium">
              There are no {filteredOption} listed here
            </p>
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center w-full mt-10">
          <LoadMoreButton
            isFetching={isFetchingNextPage}
            fetchMore={fetchNextPage}
          />
        </div>
      )}
    </section>
  );
};

export default ListView;
