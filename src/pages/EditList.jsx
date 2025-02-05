import { Link, useSearchParams } from "react-router";
import { bgPopcorn } from "../assets/icons";
import { useLists } from "../features/lists/useLists";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

import EditingName from "../components/EditingName";
import EditingDescription from "../components/EditingDescription";

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
              <SearchBar onAddMovie={handleAddMovie} />

              {shows.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-2xl font-bold mb-4">Movies in List</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {shows.map((movie) => (
                      <div
                        key={movie.id}
                        className="border p-3 rounded flex justify-between items-center"
                      >
                        <span>{movie.title}</span>
                        <span className="text-sm text-gray-500">
                          {movie.release_date?.split("-")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </section>
      )}
    </main>
  );
};

export default EditList;
