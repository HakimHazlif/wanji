import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useListsContext } from "../../../context/ListsContext";
import { Box, Rating } from "@mui/material";
import RatingPopup from "../components/RatingPopup";
import { useSession } from "../../../context/SessionContext";

const UserRateMini = ({
  item,
  addStars = false,
  buttonStyle,
  starsColorFilled = "#ff7f50",
}) => {
  const { handleLoginAction } = useSession();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { itemsStatusMap } = useListsContext();

  const rating = itemsStatusMap?.[item?.type]?.get(item?.itemId)?.rating ?? 0;

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
      <button
        className="flex items-center justify-center gap-2 cursor-pointer"
        onClick={(e) => handleLoginAction(() => handleOpenPopup(e))}
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
                  color: starsColorFilled,
                },
              }}
            />
          </Box>
        )}
        <div className={buttonStyle}>
          {!addStars && <FaStar className="text-white" />}
          {addStars && rating === 0 && <span>0</span>}
          {rating > 0 && <span>{rating}</span>}
        </div>
      </button>
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
