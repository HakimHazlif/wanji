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

  const typeMap = itemsStatusMap.get(item?.type);
  const rating = typeMap?.get(String(item?.itemId))?.get("rating") ?? 0;

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
          className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleOpenPopup}
        >
          {addStars && (
            <Box className="flex items-center">
              <Rating
                value={Number(rating) / 2}
                precision={0.1}
                readOnly
                max={5}
                sx={{
                  "& .MuiRating-icon": {
                    fontSize: `18px`,
                    "@media (min-width: 425px)": { fontSize: "20px" },
                    "@media (min-width: 640px)": { fontSize: "22px" },
                    "@media (min-width: 768px)": { fontSize: "23px" },
                    "@media (min-width: 1024px)": { fontSize: "23px" },
                  },
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
            {addStars && rating === 0 && <span>0</span>}
            {rating > 0 && <span>{rating}</span>}
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
