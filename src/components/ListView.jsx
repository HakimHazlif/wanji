import MediaCard from "../ui/MediaCard";
import { useFetchInfiniteItems } from "../features/userLists/hooks/useFetchItemsList ";
import Spinner from "../ui/Spinner";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import EmptyList from "../ui/EmptyList";
import MediaCardRow from "./MediaCardRow";
import OptionsSelector from "../ui/OptionsSelector";
import { useListsContext } from "../context/ListsContext";
import { useDeleteVisualMedia } from "../features/userLists/hooks/useDeleteVisualMedia";
import { useEffect, useMemo, useState } from "react";
import EditNavigateButton from "./EditNavigateButton";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import LoadMoreButton from "./LoadMoreButton";
import { useRatingList } from "../features/userLists/hooks/useRatingList";

const ListView = ({ targetList, forEditList = false }) => {
  const queryClient = useQueryClient();
  const { uid } = useSelector((state) => state.user.user);
  const { isGridView, setIsGridView } = useListsContext();

  const sortOptions = [
    "Date Added (Oldest)",
    "Date Added (Newest)",
    "TMDB Rating (Highest)",
    "TMDB Rating (Lowest)",
    "Your Rating (Highest)",
    "Your Rating (Lowest)",
    "Popularity (Highest)",
    "Popularity (Lowest)",
    "Release Date (Oldest)",
    "Release Date (Newest)",
    "Runtime (Longest)",
    "Runtime (Shortest)",
    "Alphabetical (A-Z)",
    "Alphabetical (Z-A)",
  ];
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const [isOpenSort, setIsOpenSort] = useState(false);

  const filterOptions = ["All", "Movies", "TV Shows", "Episodes"];
  const [filteredOption, setFilteredOption] = useState(filterOptions[0]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

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

  function handleSelectSortOption(option) {
    setSelectedOption(option);
  }

  function handleSelectFilterOption(option) {
    setFilteredOption(option);
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
      <div className="flex justify-between items-center border-b border-slate-600 pb-5">
        <div>
          <h3 className="bg-bluish-black text-gray-400 text-lg px-6 py-2 rounded-full font-medium text-center">
            {itemsList?.length < list.length
              ? `1-${itemsList?.length} ${
                  itemsList?.length <= 1 ? "title" : "titles"
                } / ${list.length}`
              : `${list.length} ${list.length <= 1 ? "title" : "titles"}`}
          </h3>
        </div>
        <div className="flex items-center gap-5">
          {!forEditList && (
            <EditNavigateButton
              navigateLink={`edit?listId=${listId}`}
              tooltipTitle="Edit List"
            >
              <FaPencil />
              Edit List
            </EditNavigateButton>
          )}

          <OptionsSelector
            selectedOption={filteredOption}
            handleToggle={setIsOpenFilter}
            sortOptions={filterOptions}
            isOpen={isOpenFilter}
            handleSelect={handleSelectFilterOption}
          />

          <OptionsSelector
            selectedOption={selectedOption}
            handleToggle={setIsOpenSort}
            sortOptions={sortOptions}
            isOpen={isOpenSort}
            handleSelect={handleSelectSortOption}
          />

          <button
            className={`w-9 h-9 rounded-full flex justify-center items-center  ${
              isGridView
                ? "bg-slate-700 cursor-not-allowed"
                : "hover:bg-slate-600 cursor-pointer"
            }`}
            onClick={() => setIsGridView(true)}
            disabled={isGridView}
          >
            <BsFillGrid3X3GapFill size={20} />
          </button>
          <button
            className={`w-9 h-9 rounded-full flex justify-center items-center  ${
              !isGridView
                ? "bg-slate-700 cursor-not-allowed"
                : "hover:bg-slate-600 cursor-pointer"
            }`}
            onClick={() => setIsGridView(false)}
            disabled={!isGridView}
          >
            <FaListUl size={20} />
          </button>
        </div>
      </div>

      <div>
        {sortedList?.length > 0 ? (
          isGridView ? (
            <div className="grid grid-cols-4 gap-10 py-14">
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
            </div>
          ) : (
            <div className="grid grid-flow-row gap-10 py-14">
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
            </div>
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
        <div className="flex justify-center w-full">
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
