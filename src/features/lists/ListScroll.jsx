import { useCallback, useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowForward,
} from "react-icons/io";
import { Link } from "react-router";

const ListScroll = ({ title, path = "", children }) => {
  const containerRef = useRef(null);

  const [isScrolledLeft, setIsScrolledLeft] = useState(true);
  const [isScrolledRight, setIsScrolledRight] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const [isHoveredTitle, setIsHoveredTitle] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const isAtLeft = container.scrollLeft <= 0;
    const isAtRight =
      Math.ceil(container.scrollLeft + container.offsetWidth) >=
      container.scrollWidth;

    setIsScrolledLeft(isAtLeft);
    setIsScrolledRight(isAtRight);
    setShowLeftFade(!isAtLeft);
    setShowRightFade(!isAtRight);
  }, []);

  const handleScroll = useCallback(
    (direction) => {
      const container = containerRef.current;
      const scrollAmount = 280;
      if (!container) return;

      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      requestAnimationFrame(updateScrollState);
    },
    [updateScrollState]
  );

  useEffect(() => {
    updateScrollState();
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState);

    return () => container.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-10">
        <Link
          to={path}
          className={`heading-title-1 flex items-end md:gap-4 gap-2 group ${
            path !== "" ? "cursor-pointer" : "cursor-default"
          }`}
          onMouseEnter={() => setIsHoveredTitle(true)}
          onMouseLeave={() => setIsHoveredTitle(false)}
        >
          {title}
          {path && (
            <span className="flex items-center gap-2 text-gray-300 group-hover:text-orange-coral md:text-xl sm:text-lg text-base relative">
              <span
                className={`transition-all ease-in duration-400 ${
                  isHoveredTitle ? "opacity-100 delay-300" : "opacity-0"
                }`}
              >
                View all
              </span>
              <IoIosArrowForward className="absolute transform translate-x-0 md:group-hover:translate-x-[70px] sm:group-hover:translate-x-[64px]  group-hover:translate-x-[58px]  transition-transform duration-300 ease-linear md:text-3xl sm:text-2xl text-xl" />
            </span>
          )}
        </Link>
        <div className="flex gap-3 sm:text-4xl text-3xl text-slate-600 cursor-pointer">
          <IoIosArrowDropleftCircle
            onClick={() => handleScroll("left")}
            disabled={isScrolledLeft}
            className={` duration-300 transition-colors ${
              isScrolledLeft
                ? "opacity-30 cursor-not-allowed"
                : "hover:text-white"
            }`}
          />
          <IoIosArrowDroprightCircle
            onClick={() => handleScroll("right")}
            disabled={isScrolledRight}
            className={` duration-300 transition-colors ${
              isScrolledRight
                ? "opacity-30 cursor-not-allowed"
                : "hover:text-white"
            }`}
          />
        </div>
      </div>
      <div className="relative">
        <div
          className={`absolute left-0 top-0 bottom-5 w-20 bg-gradient-to-r from-[#25242f] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            showLeftFade ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-5 w-20 bg-gradient-to-l from-[#25242f] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            showRightFade ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className="grid justify-items-start md:gap-6 sm:gap-4 gap-2 grid-flow-col overflow-x-auto scrollbar-custom space-x-2 scroll-smooth pb-5 pr-1"
          ref={containerRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ListScroll;
