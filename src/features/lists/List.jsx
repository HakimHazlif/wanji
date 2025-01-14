import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { Link } from "react-router";

const List = ({ title, children }) => {
  const containerRef = useRef(null);

  const [isScrolledLeft, setIsScrolledLeft] = useState(true);
  const [isScrolledRight, setIsScrolledRight] = useState(false);

  const [isHoveredTitle, setIsHoveredTitle] = useState(false);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 260;

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
    <section className="">
      <div className=" flex items-center justify-between mb-6">
        <h2
          className="font-bold text-3xl flex items-center gap-2 cursor-pointer group"
          onMouseEnter={() => setIsHoveredTitle(true)}
          onMouseLeave={() => setIsHoveredTitle(false)}
        >
          {title}
          <span className="flex items-center gap-1 text-blue-maya mt-2 text-base  relative">
            <Link
              className={`transition-all  ease-in duration-400 ${
                isHoveredTitle ? "opacity-100 delay-300" : "opacity-0"
              }`}
            >
              View all
            </Link>

            <FaArrowRight className=" absolute transform translate-x-0 group-hover:translate-x-16 transition-transform duration-300 ease-linear text-sm" />
          </span>
        </h2>
        <div className="flex gap-3 text-4xl text-slate-600 cursor-pointer">
          <IoIosArrowDropleftCircle
            onClick={() => handleScroll("left")}
            disabled={isScrolledLeft}
          />
          <IoIosArrowDroprightCircle
            onClick={() => handleScroll("right")}
            disabled={isScrolledRight}
          />
        </div>
      </div>
      <div
        className="grid gap-5 grid-flow-col overflow-x-scroll scrollbar-hide space-x-2 "
        ref={containerRef}
      >
        {children}
      </div>
    </section>
  );
};

export default List;
