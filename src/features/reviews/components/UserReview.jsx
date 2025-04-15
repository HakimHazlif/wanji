import { useRef, useState } from "react";
import UserAvatar from "../../../ui/UserAvatar";
import ReviewPopup from "./ReviewPopup";

const UserReview = ({ show, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between">
        <div className="flex gap-5 items-center">
          <UserAvatar size="w-24 sm:w-28" textSize="text-6xl" />
          <div className="">
            <p className="text-lg text-slate-300">What did you think?</p>
            <p className="text-sm text-slate-400">
              Write a review about{" "}
              <span className="text-orange-amber ">
                {show?.title || show?.name}
              </span>{" "}
              and share your thoughts.
            </p>
          </div>
        </div>

        <div className="flex max-md:justify-center max-md:w-full">
          <button
            ref={triggerRef}
            onClick={() => setIsOpen(true)}
            className="mt-4 lg:w-60 md:w-52 w-48 min-w-40 py-2 bg-orange-amber text-gray-900 rounded-full hover:bg-amber-300 transition-colors duration-200 font-semibold"
          >
            Write a Review
          </button>
        </div>
      </div>
      {isOpen && (
        <ReviewPopup
          show={show}
          type={type}
          onClose={() => setIsOpen(false)}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
};

export default UserReview;
