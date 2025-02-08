import { useState } from "react";
import CreditCard from "./CreditCard";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

const CreditsScroll = ({ title, credits }) => {
  const [isHoveredTitle, setIsHoveredTitle] = useState(false);

  return (
    <div className="">
      <div>
        <h2
          className="font-bold text-3xl flex items-center gap-4 cursor-pointer group text-white"
          onMouseEnter={() => setIsHoveredTitle(true)}
          onMouseLeave={() => setIsHoveredTitle(false)}
        >
          {title}
          <span className="flex items-center gap-1 text-blue-400 text-base relative">
            <Link
              className={`transition-all  ease-in duration-400 ${
                isHoveredTitle ? "opacity-100 delay-300" : "opacity-0"
              }`}
            >
              View all
            </Link>
            <IoIosArrowForward className=" absolute transform translate-x-0 group-hover:translate-x-16 transition-transform duration-300 ease-linear text-3xl" />
          </span>
        </h2>
        <div className="relative flex items-center px-2 py-4 rounded-lg overflow-hidden text-white">
          <div className="rounded-md bg-[#1d1d26] py-5 w-full px-5 space-x-2 flex gap-2 overflow-x-scroll  scrollbar-custom">
            {credits?.map((profile) => (
              <CreditCard key={profile.id} person={profile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsScroll;
