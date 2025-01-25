import { Link, useSearchParams } from "react-router";
import { useLists } from "../features/lists/useLists";
import { IoIosArrowForward } from "react-icons/io";
import CreateListButton from "./CreateListButton";
import { updateDateFormat } from "../utils/helper";

const CustomLists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  function handleNavigate(newListId) {
    searchParams.set("listId", newListId);
    setSearchParams(searchParams);
  }

  const { remainLists } = useLists();

  // console.log(remainLists);

  // useEffect(() => {
  //   const firstList = remainLists?.[0]?.id;
  //   handleNavigate(firstList);
  // }, [remainLists?.[0]?.id]);

  if (remainLists?.length < 1 || !remainLists)
    return (
      <section className="flex flex-col gap-6 text-center justify-center items-center">
        <p>
          You haven&#39;t created a list yet. Start by creating your first list
          to explore items!
        </p>
        <CreateListButton />
      </section>
    );

  return (
    <section className="w-full">
      <h3>
        {remainLists?.length} {remainLists?.length === 1 ? "list" : "lists"}
      </h3>
      <ul className="h-auto flex flex-col gap-4 shadow-lg justify-start w-full ">
        {remainLists?.map((list) => (
          <li
            key={list.id}
            className="bg-bluish-black w-full rounded-lg px-5 py-7"
          >
            <h3 className="font-bold text-xl">{list.name}</h3>
            {list.items_list.length ? (
              <div className="flex gap-2">
                <span className="block">
                  Has {list.items_list.length}{" "}
                  {list.items_list.length === 1 ? "title" : "titles"}
                </span>
                <span>&#x2022;</span>
                <span>
                  {
                    list.items_list.filter((item) => item.type === "movie")
                      .length
                  }{" "}
                  Movie
                </span>
                <span>&#x2022;</span>
                <span>
                  {list.items_list.filter((item) => item.type === "tv").length}{" "}
                  Tv Show
                </span>
                <span>&#x2022;</span>
                <span>
                  {
                    list.items_list.filter((item) => item.type === "episode")
                      .length
                  }{" "}
                  Episode
                </span>
              </div>
            ) : (
              <p>Has no movie, tv show or episode yet</p>
            )}
            <p>Created at {updateDateFormat(list.created_at)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CustomLists;
