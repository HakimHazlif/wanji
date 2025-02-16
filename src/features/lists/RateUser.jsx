import { useState } from "react";
import RatingPopup from "./RatingPopup";
import { useRating } from "./useRating";
import { FaRegStar, FaStar } from "react-icons/fa";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAddRating } from "./useAddRating";
import { useUpadetRating } from "./useUpadetRating";
import { Tooltip } from "@mui/material";

const RateUser = ({ item }) => {
  const { showRate, isLoading } = useRating(item?.type, item?.itemId);
  const { isLoading: isAdding } = useAddRating();
  const { isLoading: isUpdating } = useUpadetRating();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (isLoading || isAdding || isUpdating) return <SpinnerMini />;

  return (
    <>
      <Tooltip title={showRate ? "Update your rate" : "Add your rate"}>
        <span>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="py-3 px-5 rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm flex items-center gap-2 hover:text-orange-amber duration-300 ease-linear transition-colors cursor-pointer"
          >
            {showRate ? (
              <>
                <FaStar className="text-xl text-orange-amber" />
                <p className="font-bold text-lg"> {showRate}/10</p>
              </>
            ) : (
              <>
                <span className="text-lg">Add your rate</span>
                <FaRegStar className="text-2xl" />
              </>
            )}
          </button>
        </span>
      </Tooltip>

      {isPopupOpen && (
        <RatingPopup
          setClosePopup={() => setIsPopupOpen(false)}
          item={item}
          showRate={showRate}
        />
      )}
    </>
  );
};

export default RateUser;
