import { useEffect, useState } from "react";
import CreditCard from "../../components/CreditCard";
import { IoIosArrowDown } from "react-icons/io";

const ShowCredite = ({ title, creditsList }) => {
  const [viewMore, setViewMore] = useState(false);
  // const [cast, setCast] = useState([]);
  // const [containerHeight, setContainerHeight] = useState("auto");

  const displayedCast = viewMore ? creditsList : creditsList.slice(0, 12);

  // useEffect(() => {
  //   const rowCount = Math.ceil(displayedCast.length / 4);
  //   const baseHeight = 280;
  //   const gap = 40;

  //   const calculatedHeight = viewMore
  //     ? Math.min(400, rowCount * baseHeight + (rowCount - 1) * gap)
  //     : Math.min(400, 3 * baseHeight + 2 * gap);

  //   setContainerHeight(`${calculatedHeight}px`);
  // }, [viewMore, creditsList, displayedCast.length]);

  const toggleViewMore = () => {
    setViewMore((prev) => !prev);
  };

  return (
    <section className="pt-24">
      <div className="flex items-end justify-between border-b border-slate-700 pb-4">
        <h3 className="text-4xl font-semibold">{title}</h3>
        {creditsList.length > 12 && (
          <button
            className="text-sm font-medium flex items-center justify-between w-32 gap-2 hover:text-orange-amber duration-150 transition-colors"
            onClick={toggleViewMore}
          >
            <IoIosArrowDown
              className={`text-base transform transition-transform duration-300 ease-out ${
                viewMore ? "rotate-180" : "rotate-0"
              }`}
            />
            <span className="w-28">{viewMore ? "Show less" : "Show more"}</span>
          </button>
        )}
      </div>

      <div
        className={`relative overflow-y-auto scrollbar-custom rounded-b-lg transition-all duration-300 ease-in-out py-8 ${
          viewMore ? "bg-bluish-black h-[400px]" : ""
        }`}
      >
        <div className="grid grid-cols-4 gap-10 text-center px-5">
          {displayedCast.map((person) => (
            <CreditCard
              key={person.id}
              person={person}
              direction="row"
              size="small"
            />
          ))}
        </div>
      </div>

      {creditsList.length > 12 && (
        <div className="w-full flex justify-center items-center mt-6">
          <button
            className="text-sm font-medium flex items-center justify-between w-32 gap-2 hover:text-orange-amber duration-150 transition-colors"
            onClick={toggleViewMore}
          >
            <IoIosArrowDown
              className={`text-base transform transition-transform duration-300 ease-out ${
                viewMore ? "rotate-180" : "rotate-0"
              }`}
            />
            <span className="w-28">{viewMore ? "Show less" : "Show more"}</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default ShowCredite;
