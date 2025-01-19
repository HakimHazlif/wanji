import { Rating } from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useUpadetRating } from "./useUpadetRating";
import { useAddRating } from "./useAddRating";
import { useRating } from "./useRating";
import { useSelector } from "react-redux";

const RatingPopup = ({ setClosePopup, itemId, type, parentId = null }) => {
  const { updateRating } = useUpadetRating();
  const { addRating } = useAddRating();
  const { showRate } = useRating();
  const { uid } = useSelector((state) => state.user.user);

  const [rating, setRating] = useState(showRate || 0);
  const [hover, setHover] = useState(0);

  const handleSubmit = async () => {
    try {
      if (!uid) throw new Error("You should log in first");

      const rowQuery = {
        itemId,
        type: type,
        rating,
        userId: uid,
        parentId,
      };

      if (!showRate) addRating(rowQuery);
      else updateRating(rowQuery);

      setClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[400px] bg-slate-900 rounded-xl p-6 relative">
        <button
          onClick={setClosePopup}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <IoClose size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-6">
            Rate this {type}
          </h2>

          <div className="flex flex-col items-center gap-4">
            <Rating
              name="rating"
              value={rating}
              precision={0.5}
              max={10}
              size="large"
              onChange={(_, newValue) => setRating(newValue)}
              onChangeActive={(_, newHover) => setHover(newHover)}
              sx={{
                "& .MuiRating-icon": {
                  color: "#9CA3AF",
                },
                "& .MuiRating-iconFilled": {
                  color: "#FFA726",
                },
                "& .MuiRating-iconHover": {
                  color: "#FFB74D",
                },
              }}
            />

            <div className="text-lg font-medium text-white">
              {hover !== -1 ? hover : rating}/10
            </div>

            <button
              onClick={handleSubmit}
              disabled={!rating}
              className="mt-4 w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
            >
              Add Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
