import { useState } from "react";
import RatingPopup from "./RatingPopup";
import { FaRegStar, FaStar } from "react-icons/fa";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAddRating } from "./useAddRating";
import { useUpadetRating } from "./useUpadetRating";
import { Tooltip } from "@mui/material";
import { useListsContext } from "../../context/ListsContext";

const RateUser = ({ item }) => {
  const { itemId, type } = item;

  const { isLoading: isAdding } = useAddRating();
  const { isLoading: isUpdating } = useUpadetRating();

  const { itemsStatusMap } = useListsContext();

  const typeMap = itemsStatusMap.get(type);
  const rating = typeMap?.get(String(itemId))?.get("rating") ?? 0;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (isAdding || isUpdating) return <SpinnerMini />;

  return (
    <>
      <Tooltip title={rating ? "Update your rate" : "Add your rate"}>
        <span>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-5 py-[9px] rounded-lg bg-black/20 backdrop-blur-lg text-white font-medium text-sm flex items-center justify-center gap-2 hover:text-orange-amber ease-linear cursor-pointer hover:scale-105 transition-all duration-300"
          >
            {rating ? (
              <>
                <FaStar className="text-xl text-orange-amber" />
                <p className="font-bold md:text-lg text-sm"> {rating}/10</p>
              </>
            ) : (
              <>
                <span className="md:text-lg text-sm font-medium">
                  Add Your Rate
                </span>
                <FaRegStar className="md:text-2xl text-lg" />
              </>
            )}
          </button>
        </span>
      </Tooltip>

      {isPopupOpen && (
        <RatingPopup
          setClosePopup={() => setIsPopupOpen(false)}
          item={item}
          showRate={rating}
        />
      )}
    </>
  );
};

export default RateUser;
