import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLists } from "../features/userLists/hooks/useLists";
import CustomListCard from "../ui/CustomListCard";
import EmptyShortList from "./EmptyShortList";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import EmptyListButton from "./EmptyListButton";

const ProfileCustomLists = () => {
  const { transitionNavigate } = useTransitionNavigate();
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
          <ul className="grid sm:grid-cols-2 grid-cols-1 grid-flow-row gap-4">
            {remainLists?.slice(0, 4)?.map((list) => (
              <CustomListCard key={list.id} list={list} />
            ))}
          </ul>
        ) : (
          <EmptyShortList listName="List">
            <EmptyListButton
              handleClick={() =>
                transitionNavigate(
                  `/u/${username.replace(" ", "-")}/list/create`
                )
              }
            >
              Create a List
            </EmptyListButton>
          </EmptyShortList>
        )}
      </div>
    </section>
  );
};

export default ProfileCustomLists;
