import { FaStar } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import RatingPopup from "./RatingPopup";
import { useRatingList } from "./useRatingList";
import SpinnerMini from "../../ui/SpinnerMini";
import { Tooltip } from "@mui/material";
import { useUpadetRating } from "./useUpadetRating";
import { useAddRating } from "./useAddRating";

const UserRateMini = ({ type, itemId }) => {
  const [rating, setRating] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { ratingList, isLoading } = useRatingList();
  const { isLoading: isUpading } = useUpadetRating();
  const { isLoading: isAdding } = useAddRating();

  const handleOpenPopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const handleClosePopup = (e) => {
    e?.stopPropagation();
    setIsPopupOpen(false);
  };

  let content;

  useEffect(() => {
    const rate = ratingList?.rating?.filter((el) => el.item_id == itemId)?.[0]
      ?.rate;

    if (rate) {
      setRating(rate);
    }
  }, [itemId, type, ratingList]);

  if (isAdding || isUpading) content = <SpinnerMini />;
  else
    content = (
      <>
        <FaStar />
        {rating > 0 && <p>{rating}</p>}
      </>
    );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Tooltip title={rating ? "Update your rate" : "Add your rate"}>
        <span>
          <button
            onClick={handleOpenPopup}
            disabled={isAdding || isUpading}
            className="rounded-md bg-orange-coral w-[45px] h-6 flex items-center justify-center gap-1 text-xs font-bold "
          >
            {content}
          </button>
        </span>
      </Tooltip>
      {isPopupOpen && (
        <RatingPopup
          isPopupOpen={isPopupOpen}
          setClosePopup={handleClosePopup}
          itemId={itemId}
          type={type}
          showRate={rating}
        />
      )}
    </div>
  );
};

export default UserRateMini;
