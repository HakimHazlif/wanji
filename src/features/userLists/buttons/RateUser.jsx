import { useState } from "react";
import { useAddRating } from "../hooks/useAddRating";
import { useUpadetRating } from "../hooks/useUpadetRating";
import { useListsContext } from "../../../context/ListsContext";
import SpinnerMini from "../../../ui/SpinnerMini";
import { FaRegStar, FaStar } from "react-icons/fa";
import RatingPopup from "../components/RatingPopup";

const RateUser = ({ item }) => {
  const { itemId, type } = item;

  const { isLoading: isAdding } = useAddRating();
  const { isLoading: isUpdating } = useUpadetRating();

  const { itemsStatusMap } = useListsContext();

  const rating = itemsStatusMap?.[type]?.get(itemId)?.rating ?? 0;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (isAdding || isUpdating) return <SpinnerMini />;

  return (
    <>
      <span>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-5 py-[9px] rounded-lg bg-[#0000]/30 backdrop-blur-lg hover:bg-[#0000]/60 ease-linear cursor-pointer hover:scale-105 transition-all text-white font-medium text-sm flex items-center justify-center gap-2 hover:text-orange-amber duration-300"
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
