import Rating from "../ui/Rating";
import { formatNumber } from "../utils/helper";
import React, { useEffect, useState } from "react";

const RatingBox = React.memo(
  ({
    rating,
    styleOfSpan,
    initialStars = 10,
    size = 30,
    color = "#ffbf00",
  }) => {
    const [maxRating, setMaxRating] = useState(initialStars);

    useEffect(() => {
      if (initialStars <= 5) return;

      const handleResize = () => {
        if (window.innerWidth < 640) {
          setMaxRating(5);
        } else {
          setMaxRating(10);
        }
      };

      window.addEventListener("resize", handleResize);

      // handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, [initialStars]);

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Rating
            value={maxRating === 5 ? Number(rating) / 2 : Number(rating)}
            precision={0.1}
            readOnly={true}
            maxRating={maxRating}
            size={size}
            color={color}
          />
        </div>
        <span className={`text-center ${styleOfSpan}`}>
          {formatNumber(rating) || 0}
        </span>
      </div>
    );
  }
);

RatingBox.displayName = "RatingBox";

export default RatingBox;
