import { Link, useSearchParams } from "react-router";
import { bgPopcorn } from "../assets/icons";
import { useLists } from "../features/lists/useLists";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

import EditingName from "../components/EditingName";
import EditingDescription from "../components/EditingDescription";
import ListView from "../components/ListView";
import AddingSearchBar from "../components/AddingSearchbar";

const EditList = () => {
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");
  const { username } = useSelector((state) => state.user.user);

  const { remainLists } = useLists();
  const list = remainLists?.find((list) => list.id === listId);

  const [shows, setShows] = useState([]);

  const handleAddMovie = (movie) => {
    // Add movie to list, prevent duplicates
    if (!shows.find((m) => m.id === movie.id)) {
      setShows((prev) => [...prev, movie]);
    }
  };

  return (
    <main className="padding-x py-32">
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={bgPopcorn}
          alt="backdrop of movie"
          className="h-[400px] w-full object-cover object-center masking"
        />
        <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>

      {list?.id && (
        <section className="w-full mb-20 flex items-center gap-20">
          <div className="w-full">
            <EditingName list={list} />

            <div className="flex items-center gap-1 mb-5">
              {list?.created_at && (
                <p className="font-semibold">
                  Created <span>{formatDistanceToNow(list?.created_at)}</span>{" "}
                  ago
                </p>
              )}
              <p className="font-semibold">
                by{" "}
                <Link
                  to={`/u/${username}`}
                  className="font-bold text-orange-amber hover:text-blue-700 duration-200 transition-colors"
                >
                  {username}
                </Link>
              </p>
            </div>

            <EditingDescription list={list} />

            <section className="py-20">
              <AddingSearchBar list={list} />

              {list?.id && <ListView targetList={list} forEditList={true} />}
            </section>
          </div>
        </section>
      )}
    </main>
  );
};

export default EditList;
