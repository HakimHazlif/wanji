import { useSearchParams } from "react-router-dom";
import { bgPopcorn } from "../assets/icons";
import { useLists } from "../features/userLists/hooks/useLists";
import { useSelector } from "react-redux";
import EditingName from "../components/EditingName";
import EditingDescription from "../components/EditingDescription";
import ListView from "../features/userLists/components/ListView";
import AddingSearchBar from "../components/AddingSearchbar";
import { IoIosArrowBack } from "react-icons/io";
import CreatedByAuth from "../components/CreatedByAuth";
import HeaderBackDrop from "../ui/HeaderBackDrop";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const EditList = () => {
  const { transitionNavigate } = useTransitionNavigate();
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");
  const { username } = useSelector((state) => state.user.user);

  const { lists } = useLists();
  const list = lists?.find((list) => list.id === listId);

  return (
    <main className="padding-x py-32">
      <HeaderBackDrop backdrop={bgPopcorn} height="h-[400px]" />

      {list?.id && (
        <section className="w-full mb-20 flex items-center gap-20">
          <div className="w-full">
            <div className="mb-6">
              <button
                className="flex items-center gap-2 group text-lg font-semibold hover:text-white text-gray-400 transition-colors duration-100 ease-out"
                onClick={() => transitionNavigate(-1)}
              >
                <IoIosArrowBack
                  className="group-hover:animate-zigzag transition-all duration-200 ease-linear"
                  size={25}
                />
                Back
              </button>
            </div>
            {list?.name === "watchlist" || list?.name === "favorite" ? (
              <h1 className="font-bold text-5xl mb-5 capitalize">
                {list?.name}
              </h1>
            ) : (
              <EditingName list={list} />
            )}

            <CreatedByAuth createdDate={list?.created_at} username={username} />

            {list?.name === "watchlist" || list?.name === "favorite" ? (
              <p className="font-sembold text-xl text-gray-300 mb-5">
                {list?.description}
              </p>
            ) : (
              <EditingDescription list={list} />
            )}

            <section className="py-20">
              <div className="mb-20">
                <AddingSearchBar list={list} />
              </div>

              {list?.id && <ListView targetList={list} forEditList={true} />}
            </section>
          </div>
        </section>
      )}
    </main>
  );
};

export default EditList;
