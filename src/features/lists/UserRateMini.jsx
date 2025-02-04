import { FaStar } from "react-icons/fa";
import { useCallback, useEffect, useMemo, useState } from "react";
import RatingPopup from "./RatingPopup";
import { useRatingList } from "./useRatingList";
import SpinnerMini from "../../ui/SpinnerMini";
import { Box, Rating, Tooltip } from "@mui/material";
import { useUpadetRating } from "./useUpadetRating";
import { useAddRating } from "./useAddRating";

const UserRateMini = ({ type, itemId, addStars = false, buttonStyle }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { ratingList } = useRatingList();
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

  const rating = useMemo(
    () =>
      ratingList?.rating?.filter(
        (el) => el.item_id == itemId && el.type === type
      )?.[0]?.rate || 0,
    [itemId, ratingList, type]
  );

  let content;
  if (isAdding || isUpading) content = <SpinnerMini />;
  else
    content = (
      <>
        {!addStars && <FaStar className="text-white" />}
        {addStars && rating === 0 && 0}
        {rating > 0 && <p>{rating}</p>}
      </>
    );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Tooltip title={rating ? "Update your rate" : "Add your rate"}>
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleOpenPopup}
        >
          {addStars && (
            <Box>
              <Rating
                value={Number(rating) / 2}
                precision={0.1}
                readOnly
                max={5}
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "#ffffff40",
                  },
                  "& .MuiRating-iconFilled": {
                    color: "#ff7f50",
                  },
                }}
              />
            </Box>
          )}
          <button disabled={isAdding || isUpading} className={buttonStyle}>
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
