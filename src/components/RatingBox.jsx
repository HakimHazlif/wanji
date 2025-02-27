import { Box, Rating, Tooltip } from "@mui/material";
import { formatNumber } from "../utils/helper";
import { useEffect, useState } from "react";

const RatingBox = ({
  rating,
  styleOfSpan,
  filledStarsColor = "#FFD700",
  emptyStarsColor = "#ffffff",
  starsSize = {
    fontSize: `20px`,
    "@media (min-width: 425px)": { fontSize: "21px" },
    "@media (min-width: 640px)": { fontSize: "24px" },
    "@media (min-width: 768px)": { fontSize: "27px" },
    "@media (min-width: 1024px)": { fontSize: "30px" },
  },
  initialStars = 10,
  minWidth = 640,
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
    <Tooltip title="TMDB rate">
      <div className="flex items-center gap-2">
        <Box className="flex items-center">
          <Rating
            value={
              maxRating === 5 ? Math.ceil(Number(rating) / 2) : Number(rating)
            }
            precision={0.1}
            readOnly
            max={maxRating}
            sx={{
              "& .MuiRating-icon": starsSize,
              "& .MuiRating-iconEmpty": {
                color: emptyStarsColor,
              },
              "& .MuiRating-iconFilled": {
                color: filledStarsColor,
              },
            }}
          />
        </Box>
        <span className={styleOfSpan}>{formatNumber(rating)}</span>
      </div>
    </Tooltip>
  );
};

export default RatingBox;
