import { useState } from "react";
import RatingPopup from "./RatingPopup";
import { useRating } from "./useRating";
import { FaRegStar, FaStar } from "react-icons/fa";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAddRating } from "./useAddRating";
import { useUpadetRating } from "./useUpadetRating";

const RateUser = ({ itemId, type }) => {
  const { showRate, isLoading } = useRating();
  const { isLoading: isAdding } = useAddRating();
  const { isLoading: isUpdating } = useUpadetRating();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (isLoading || isAdding || isUpdating) return <SpinnerMini />;

  return (
    <>
      <div
        onClick={() => setIsPopupOpen(true)}
        className="py-4 px-5 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm flex items-center gap-2 hover:text-orange-amber duration-300 ease-linear transition-colors cursor-pointer"
      >
        {showRate ? (
          <>
            <FaStar className="text-xl text-orange-amber" />
            <p className="font-bold text-xl">{showRate}/10</p>
          </>
        ) : (
          <>
            <span className="text-lg">Add your rate</span>
            <FaRegStar className="text-2xl" />
          </>
        )}
      </div>
      {isPopupOpen && (
        <RatingPopup
          isPopupOpen={isPopupOpen}
          setClosePopup={() => setIsPopupOpen(false)}
          itemId={itemId}
          type={type}
          showRate={showRate}
        />
      )}
    </>
  );
};

export default RateUser;
