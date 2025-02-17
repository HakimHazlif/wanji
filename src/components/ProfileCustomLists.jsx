import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useLists } from "../features/lists/useLists";
import CustomListCard from "../ui/CustomListCard";
import EmptyShortList from "./EmptyShortList";

const ProfileCustomLists = () => {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user.user);
  const { remainLists } = useLists();

  const [isHoveredTitle, setIsHoveredTitle] = useState(false);

  return (
    <section className="mt-32">
      <div className="flex items-center justify-between mb-10">
        <Link
          to={`/u/${username.replace(" ", "-")}/Lists`}
          className={`text-4xl font-semibold flex items-end gap-4 group text-white group`}
          onMouseEnter={() => setIsHoveredTitle(true)}
          onMouseLeave={() => setIsHoveredTitle(false)}
        >
          My Lists
          <span className="flex items-center gap-2 text-gray-300 group-hover:text-orange-coral text-xl relative">
            <span
              className={`transition-all ease-in duration-400 ${
                isHoveredTitle ? "opacity-100 delay-300" : "opacity-0"
              }`}
            >
              View all
            </span>
            <IoIosArrowForward
              className="absolute transform translate-x-0 group-hover:translate-x-[70px] transition-transform duration-300 ease-linear"
              size={30}
            />
          </span>
        </Link>
      </div>
      <div className="">
        {remainLists?.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4">
            {remainLists?.slice(0, 4)?.map((list) => (
              <CustomListCard key={list.id} list={list} />
            ))}
          </ul>
        ) : (
          <EmptyShortList listNmae="List">
            <button
              onClick={() =>
                navigate(`/u/${username.replace(" ", "-")}/list/create`)
              }
              className="px-10 py-[10px] bg-orange-amber rounded-full flex justify-center items-center hover:bg-orange-coral transition-colors duration-300 text-gray-900 font-medium"
            >
              Create a List
            </button>
          </EmptyShortList>
        )}
      </div>
    </section>
  );
};

export default ProfileCustomLists;
