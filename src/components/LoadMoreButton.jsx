import React from "react";
import SpinnerMini from "../ui/SpinnerMini";

const LoadMoreButton = ({ isFetching, fetchMore }) => {
  return (
    <button
      className="py-2 font-bold text-lg bg-orange-amber rounded-full w-4/5"
      onClick={() => fetchMore()}
      disabled={isFetching}
    >
      {isFetching ? (
        <div className="flex justify-center items-center">
          <SpinnerMini size={30} />
        </div>
      ) : (
        "Load More"
      )}
    </button>
  );
};

export default LoadMoreButton;
