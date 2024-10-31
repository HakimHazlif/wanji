import { useRef, useState } from "react";
import CrediteCard from "./CrediteCard";
import { useSelector } from "react-redux";
import { showCredite } from "../data/movieSlice";

const ProfilesScroll = ({ title }) => {
  const credites = useSelector(showCredite);
  const containerRef = useRef(null);
  const [isScrolledLeft, setIsScrolledLeft] = useState(true);
  const [isScrolledRight, setIsScrolledRight] = useState(false);

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

  const crediteData = title === "Casting" ? credites.cast : credites.crew;

  return (
    <div className="">
      {crediteData.length >= 1 && (
        <div>
          <h2 className="mb-5 text-4xl font-semibold">{title}</h2>
          <div className="relative flex items-center bg-slate-400 px-2 py-4 rounded-lg overflow-hidden text-black">
            <button
              onClick={() => handleScroll("left")}
              className={`absolute bg-black bg-opacity-60 text-slate-200 w-10 h-full left-0 z-10 p-1 ${
                isScrolledLeft ? "opacity-0" : "opacity-100"
              }`}
              disabled={isScrolledLeft}
            >
              <i className="fa-solid fa-chevron-left text-lg"></i>
            </button>
            <div
              ref={containerRef}
              className="overflow-x-scroll scrollbar-hide space-x-2 flex gap-2"
              onScroll={() => {
                const container = containerRef.current;
                setIsScrolledLeft(container.scrollLeft <= 0);
                setIsScrolledRight(
                  container.scrollLeft + container.offsetWidth >=
                    container.scrollWidth
                );
              }}
            >
              {crediteData.map((profile, index) => (
                <CrediteCard
                  key={String(profile.id) + "-" + index}
                  id={profile.id}
                  name={profile.name}
                  character={profile.character || profile.job}
                  image={profile.profile_path}
                />
              ))}
            </div>
            <button
              onClick={() => handleScroll("right")}
              className={`absolute bg-black bg-opacity-60 text-slate-200 w-10 h-full right-0 z-10 p-1 ${
                isScrolledRight ? "opacity-0" : "opacity-100"
              }`}
              disabled={isScrolledRight}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilesScroll;
