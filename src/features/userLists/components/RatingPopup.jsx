import { useSelector } from "react-redux";
import { useListsContext } from "../../../context/ListsContext";
import { useEffect, useRef, useState } from "react";
import { useUpadetRating } from "../hooks/useUpadetRating";
import { useAddRating } from "../hooks/useAddRating";
import { IoClose } from "react-icons/io5";
import { Rating } from "@mui/material";
import SpinnerMini from "../../../ui/SpinnerMini";

const RatingPopup = ({ setClosePopup, item, showRate = 0 }) => {
  const { uid } = useSelector((state) => state.user.user);

  const { setItemsStatusMap } = useListsContext();

  const [rating, setRating] = useState(Number(showRate));
  const [hover, setHover] = useState(0);
  const popupRef = useRef();

  const { itemId, type, parentId, season, episode } = item;

  const { updateRating, isLoading: isUpading } = useUpadetRating(type);
  const { addRating, isLoading: isAdding } = useAddRating(type);

  const handleSubmit = async () => {
    try {
      if (!uid) throw new Error("You should log in first");

      const rowQuery = {
        itemId: itemId,
        type: type,
        rating,
        userId: uid,
        parentId: parentId,
        season: season,
        episode: episode,
      };

      if (!showRate)
        addRating(rowQuery, {
          onSuccess: () => {
            setItemsStatusMap((prev) => {
              const newMap = new Map(prev[type]);

              if (!newMap.has(itemId))
                newMap.set(itemId, {
                  inWatchlist: false,
                  inFavorites: false,
                  rating,
                });
              else newMap.get(itemId).rating = rating;

              return {
                ...prev,
                [type]: newMap,
              };
            });

            setClosePopup();
          },
        });
      else
        updateRating(rowQuery, {
          onSuccess: () => {
            setItemsStatusMap((prev) => {
              const newMap = new Map(prev[type]);

              if (!newMap.has(itemId))
                newMap.set(itemId, {
                  inWatchlist: false,
                  inFavorites: false,
                  rating,
                });
              else newMap.get(itemId).rating = rating;

              return {
                ...prev,
                [type]: newMap,
              };
            });

            setClosePopup();
          },
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    function handleClosePopup(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        event.stopPropagation();

        setClosePopup();
      }
    }

    document.addEventListener("mousedown", handleClosePopup);

    return () => {
      document.removeEventListener("mousedown", handleClosePopup);
    };
  }, [setClosePopup]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div
        className="w-[400px] bg-slate-900 rounded-xl p-6 relative"
        ref={popupRef}
      >
        <button
          onClick={() => setClosePopup()}
          className="absolute z-[100] top-4 right-4 text-slate-400 hover:text-white"
        >
          <IoClose className="text-2xl" />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-6 capitalize">
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
              {hover > 0 ? hover : rating}/10
            </div>

            <button
              onClick={handleSubmit}
              disabled={!rating || isAdding || isUpading}
              className="mt-4 w-full py-3 px-4 bg-orange-amber text-slate-900 rounded-lg font-medium
                   hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200 flex justify-center items-center"
            >
              {isAdding || isUpading ? (
                <SpinnerMini />
              ) : rating ? (
                "Update Rating"
              ) : (
                "Add Rating"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
