import { FaStar } from "react-icons/fa";
import { useState } from "react";
import RatingPopup from "./RatingPopup";
import SpinnerMini from "../../ui/SpinnerMini";
import { Box, Rating, Tooltip } from "@mui/material";
import { useUpadetRating } from "./useUpadetRating";
import { useAddRating } from "./useAddRating";
import { useListsContext } from "../../context/ListsContext";

const UserRateMini = ({ item, addStars = false, buttonStyle }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { itemsStatusMap } = useListsContext();

  const rating = itemsStatusMap?.[item?.type]?.[item?.itemId]?.rating ?? false;

  // const { ratingList } = useRatingList();

  const handleOpenPopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const handleClosePopup = (e) => {
    e?.stopPropagation();
    setIsPopupOpen(false);
  };

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
          <button className={buttonStyle}>
            {!addStars && <FaStar className="text-white" />}
            {addStars && rating === 0 && 0}
            {rating > 0 && <p>{rating}</p>}
          </button>
        </span>
      </Tooltip>
      {isPopupOpen && (
        <RatingPopup
          isPopupOpen={isPopupOpen}
          setClosePopup={handleClosePopup}
          item={item}
          showRate={rating}
        />
      )}
    </div>
  );
};

export default UserRateMini;
