import { useCallback, useRef, useState } from "react";
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

  const [isHoveredTitle, setIsHoveredTitle] = useState(false);

  const handleScroll = useCallback((direction) => {
    const container = containerRef.current;
    const scrollAmount = 240;
    if (!container) return;

    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    requestAnimationFrame(() => {
      setIsScrolledLeft(container.scrollLeft <= 0);
      setIsScrolledRight(
        container.scrollLeft + container.offsetWidth >= container.scrollWidth
      );
    });
  }, []);

  return (
    <section className="">
      <div className=" flex items-center justify-between mb-6">
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
            className="hover:text-white duration-300 transition-colors"
          />
          <IoIosArrowDroprightCircle
            onClick={() => handleScroll("right")}
            disabled={isScrolledRight}
            className="hover:text-white duration-300 transition-colors"
          />
        </div>
      </div>
      <div
        className="grid gap-5 grid-flow-col overflow-x-scroll scrollbar-hide space-x-2 scroll-smooth"
        ref={containerRef}
      >
        {children}
      </div>
    </section>
  );
};

export default ListScroll;
