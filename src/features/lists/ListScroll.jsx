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
    <section className="">
      <div className="flex items-center justify-between mb-10">
        <Link
          to={path}
          className={`text-4xl font-semibold flex items-end gap-4 group text-white ${
            path !== "" ? "cursor-pointer" : "cursor-default"
          }`}
          onMouseEnter={() => setIsHoveredTitle(true)}
          onMouseLeave={() => setIsHoveredTitle(false)}
        >
          {title}
          {path && (
            <span className="flex items-center gap-1 text-blue-400 text-base relative">
              <span
                className={`transition-all  ease-in duration-400 ${
                  isHoveredTitle ? "opacity-100 delay-300" : "opacity-0"
                }`}
              >
                View all
              </span>
              <IoIosArrowForward className=" absolute transform translate-x-0 group-hover:translate-x-16 transition-transform duration-300 ease-linear text-2xl" />
            </span>
          )}
        </Link>
        <div className="flex gap-3 text-4xl text-slate-600 cursor-pointer">
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
          className="justify-start grid gap-5 grid-flow-col overflow-x-auto scrollbar-custom space-x-2 scroll-smooth pb-5"
          ref={containerRef}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default ListScroll;
