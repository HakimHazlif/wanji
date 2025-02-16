import { useRef, useState } from "react";
import UserAvatar from "../../ui/UserAvatar";
import ReviewPopup from "./ReviewPopup";

const UserReview = ({ show, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <UserAvatar size="w-28 h-28" />
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

        <button
          ref={triggerRef}
          onClick={() => setIsOpen(true)}
          className="mt-4 w-60 min-w-40 py-2 bg-orange-amber text-gray-900 rounded-full hover:bg-amber-300 transition-colors duration-200 font-semibold"
        >
          Write a Review
        </button>
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
