import { useEffect, useState } from "react";
import CreditCard from "../../components/CreditCard";
import { IoIosArrowDown } from "react-icons/io";

const ShowCredite = ({ title, creditsList }) => {
  const [viewMore, setViewMore] = useState(false);

  const cast = viewMore ? creditsList : creditsList.slice(0, 12);

  return (
    <section className="py-16">
      <div className="flex items-end justify-between border-b border-slate-700 pb-4">
        <h3 className="text-4xl font-semibold">{title}</h3>
        {creditsList.length > 12 && (
          <div
            className="text-sm font-medium flex items-center justify-between w-32 gap-2 hover:text-orange-amber duration-150 transition-colors cursor-pointer"
            onClick={() => setViewMore((prev) => !prev)}
          >
            <IoIosArrowDown
              className={`text-base transform transition-transform duration-300 ease-out ${
                viewMore ? "rotate-180" : "rotate-0"
              } `}
            />
            <p className="w-28">{viewMore ? "Show less" : "Show more"}</p>
          </div>
        )}
      </div>

      <div
        className={`overflow-y-scroll scrollbar-custom flex justify-center items-center rounded-b-lg transition-all duration-200 ${
          viewMore ? "h-[460px] bg-[#1d1628]" : ""
        }`}
      >
        <div className="grid grid-cols-4 gap-7 text-center">
          {cast.map((person, index) => (
            <CreditCard
              key={`${person.id}-${index}`}
              person={person}
              direction="row"
              size="small"
            />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div
          className="text-sm font-medium flex items-center justify-between w-32 gap-2 hover:text-orange-amber duration-150 transition-colors cursor-pointer"
          onClick={() => setViewMore((prev) => !prev)}
        >
          <IoIosArrowDown
            className={`text-base transform transition-transform duration-300 ease-out ${
              viewMore ? "rotate-180" : "rotate-0"
            } `}
          />
          <p className="w-28">{viewMore ? "Show less" : "Show more"}</p>
        </div>
      </div>
      {/* <ProfilesScroll title="Cast" credit={credits.cast} /> */}
    </section>
  );
};

export default ShowCredite;
