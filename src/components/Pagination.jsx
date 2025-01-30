import { useSearchParams } from "react-router";

const Pagination = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const range = 5;

  function getPaginationNumbers() {
    const pages = [];
    const leftSide = Math.max(2, currentPage - range);
    const rightSide = Math.min(totalPages - 1, currentPage + range);

    pages.push(1);

    if (leftSide > 2) pages.push("...");

    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    if (rightSide < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }

  const handlePageChange = (page) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", page);
      setSearchParams(newParams);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(page)}
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
        onClick={() => handlePageChange(currentPage + 1)}
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
