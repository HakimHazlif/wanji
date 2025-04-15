import { useState } from "react";
import CreditCard from "../../../components/CreditCard";
import { IoIosArrowDown } from "react-icons/io";

const MediaCredite = ({ title, creditsList }) => {
  const [viewMore, setViewMore] = useState(false);

  const displayedCast = viewMore ? creditsList : creditsList.slice(0, 12);

  const toggleViewMore = () => {
    setViewMore((prev) => !prev);
  };

  return (
    <section className="">
      <div className="flex items-end justify-between border-b border-slate-700 pb-3">
        <h2 className="heading-title-1">{title}</h2>
        {creditsList.length > 12 && (
          <button
            className="text-sm font-medium flex items-center  hover:text-orange-amber duration-150 transition-colors"
            onClick={toggleViewMore}
          >
            <IoIosArrowDown
              className={`text-base transform transition-transform duration-300 ease-out ${
                viewMore ? "rotate-180" : "rotate-0"
              }`}
            />
            <span className="w-24 text-nowrap">
              {viewMore ? "Show less" : "Show more"}
            </span>
          </button>
        )}
      </div>

      <div
        className={`relative overflow-y-auto scrollbar-custom rounded-b-lg transition-all duration-300 ease-in-out py-8 ${
          viewMore ? "bg-bluish-black h-[400px]" : ""
        }`}
      >
        <div className="grid grid-cols-2 gap-10 text-center px-5">
          {displayedCast.map((person, index) => (
            <CreditCard
              key={`${person.id}-${index}`}
              person={person}
              direction="row"
              size="meduim"
            />
          ))}
        </div>
      </div>

      {creditsList.length > 12 && (
        <div className="w-full flex justify-center items-center mt-6">
          <button
            className="text-sm font-medium flex items-center hover:text-orange-amber duration-150 transition-colors"
            onClick={toggleViewMore}
          >
            <IoIosArrowDown
              className={`text-base transform transition-transform duration-300 ease-out ${
                viewMore ? "rotate-180" : "rotate-0"
              }`}
            />
            <span className="w-24 text-nowrap">
              {viewMore ? "Show less" : "Show more"}
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default MediaCredite;
