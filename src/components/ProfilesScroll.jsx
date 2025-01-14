import { useRef, useState } from "react";
import CreditCard from "./CreditCard";

const ProfilesScroll = ({ title, credit }) => {
  const containerRef = useRef(null);
  const [isScrolledLeft, setIsScrolledLeft] = useState(true);
  const [isScrolledRight, setIsScrolledRight] = useState(false);

  console.log(credit);

  const newCredit = credit.filter((item, index) => index < 20);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 150;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }

    setIsScrolledLeft(container.scrollLeft <= 0);
    setIsScrolledRight(
      container.scrollLeft + container.offsetWidth >= container.scrollWidth
    );
  };

  return (
    <div className="">
      <div>
        <h2 className="mb-5 text-4xl font-semibold">{title}</h2>
        <div className="relative flex items-center  px-2 py-4 rounded-lg overflow-hidden text-white">
          <button
            onClick={() => handleScroll("left")}
            className={`absolute text-slate-200 w-10 h-full left-0 z-10 p-1 ${
              isScrolledLeft ? "opacity-0" : "opacity-100"
            }`}
            disabled={isScrolledLeft}
          >
            <i className="fa-solid fa-chevron-left text-5xl"></i>
          </button>
          <div
            ref={containerRef}
            className="overflow-x-scroll rounded-md bg-[#1d1d26] py-5 px-5 scrollbar-hide space-x-2 flex gap-2"
            onScroll={() => {
              const container = containerRef.current;
              setIsScrolledLeft(container.scrollLeft <= 0);
              setIsScrolledRight(
                container.scrollLeft + container.offsetWidth >=
                  container.scrollWidth
              );
            }}
          >
            {newCredit?.map((profile) => (
              <CreditCard
                key={profile.id}
                id={profile.id}
                name={profile.name}
                character={profile.character || profile.job}
                image={profile.profile_path}
              />
            ))}
          </div>
          <button
            onClick={() => handleScroll("right")}
            className={`absolute text-slate-200 w-10 h-full right-0 z-10 p-1 ${
              isScrolledRight ? "opacity-0" : "opacity-100"
            }`}
            disabled={isScrolledRight}
          >
            <i className="fa-solid fa-chevron-right text-5xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilesScroll;
