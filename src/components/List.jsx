import { useRef, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const List = ({ title, children }) => {
  const containerRef = useRef(null);

  const [isScrolledLeft, setIsScrolledLeft] = useState(true);
  const [isScrolledRight, setIsScrolledRight] = useState(false);

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
    <section className="padding-x">
      <div className=" flex items-center justify-between mb-6">
        <h2 className="font-bold text-3xl">{title}</h2>
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
