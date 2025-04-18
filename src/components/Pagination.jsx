import { useEffect, useState } from "react";

const Pagination = ({ totalPages, currentPage, changePage, range = 5 }) => {
  const [rangeState, setRangeState] = useState(range);

  function getPaginationNumbers() {
    const pages = [];
    const leftSide = Math.max(2, currentPage - rangeState);
    const rightSide = Math.min(totalPages - 1, currentPage + rangeState);

    pages.push(1);

    if (leftSide > 2) pages.push("...");

    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    if (rightSide < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }

  useEffect(() => {
    function updateRange() {
      if (window.innerWidth <= 440) {
        setRangeState(0);
      } else if (window.innerWidth <= 560) {
        setRangeState(1);
      } else if (window.innerWidth < 640) {
        setRangeState(2);
      } else {
        setRangeState(range);
      }
    }

    updateRange();
    window.addEventListener("resize", updateRange);

    return () => window.removeEventListener("resize", updateRange);
  }, [range]);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 duration-200 transition-colors ${
          currentPage === 1 ? "" : "hover:bg-orange-coral hover:text-gray-800"
        } bg-bluish-black  rounded`}
      >
        Prev
      </button>

      {getPaginationNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => changePage(page)}
            className={`px-3 py-1 rounded duration-200 transition-colors ${
              page === currentPage
                ? "bg-orange-amber text-gray-800"
                : "bg-bluish-black hover:bg-orange-coral hover:text-gray-800"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 duration-200 transition-colors ${
          currentPage === totalPages
            ? ""
            : "hover:bg-orange-coral hover:text-gray-800"
        } bg-bluish-black rounded`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
