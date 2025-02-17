import { useRef, useState } from "react";
import {
  getImageViaPath,
  getYearFormat,
  updateDateFormat,
} from "../utils/helper";
import { FaStar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Box, Button, Rating, Tooltip } from "@mui/material";
import RatingPopup from "../features/lists/RatingPopup";
import ReviewPopup from "../features/reviews/ReviewPopup";
import { useNavigate } from "react-router";

const ReviewCard = ({
  review,
  isUser = false,
  isProfileList = false,
  show = null,
  type = null,
}) => {
  const navigate = useNavigate();
  const [openRatingPopup, setOpenRatingPopup] = useState(false);
  const [openReviewPopup, setOpenReviewPopup] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const { author, author_details, content, created_at, url } = review;
  const triggerRef = useRef();

  const item = {
    itemId: show?.id,
    type,
    parentId: null,
    episode: null,
    season: null,
  };

  const formattedContent = content
    .split("\r\n\r\n")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  const avatar =
    author_details?.avatar_path?.slice(0, 5) === "https"
      ? author_details?.avatar_path
      : getImageViaPath(author_details?.avatar_path, 400);

  const getFirstLetterFromAuthor = author[0];

  const renderRating = () => {
    const rating = isProfileList ? null : author_details?.rating ?? 0;

    return (
      <>
        {rating !== null && (
          <Tooltip
            title={
              isUser
                ? !rating
                  ? "Add Your Rating"
                  : "Update Your Rating"
                : `${author}'s Rating`
            }
            className={`flex items-center gap-2  ${
              isUser ? "cursor-pointer" : ""
            }`}
            onClick={() => {
              isUser && setOpenRatingPopup(true);
            }}
          >
            <span>
              <Box className="flex items-center">
                <Rating
                  name="rating"
                  value={Math.floor(rating / 2)}
                  precision={0.5}
                  readOnly
                  max={5}
                  size="small"
                  sx={{
                    "& .MuiRating-icon": {
                      color: "#9CA3AF",
                    },
                    "& .MuiRating-iconFilled": {
                      color: "#FFA726",
                    },
                  }}
                />
              </Box>
              <div className="px-2 py-0.5 text-xs rounded-sm bg-orange-amber text-gray-800 font-semibold">
                {rating === 0 ? (
                  <FaStar className="text-white" size={14} />
                ) : (
                  rating.toFixed(1)
                )}
              </div>
            </span>
          </Tooltip>
        )}
        {openRatingPopup && (
          <RatingPopup
            setClosePopup={() => setOpenRatingPopup(false)}
            item={item}
            showRate={rating}
          />
        )}
      </>
    );
  };

  return (
    <div className="bg-bluish-black py-5 px-8 rounded-lg">
      <div className="flex gap-6">
        {isProfileList && (
          <div className="w-32 flex-shrink-0">
            <Tooltip title={review?.title}>
              <div
                className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => navigate(`/${review.type}/${review.itemId}`)}
              >
                <img
                  src={getImageViaPath(review?.posterPath, 400)}
                  alt={review?.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </Tooltip>
          </div>
        )}
        <div>
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div>
                {author_details?.avatar_path ? (
                  <img
                    src={avatar}
                    alt={`${author}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-coral"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-500 capitalize text-3xl flex justify-center items-center">
                    {getFirstLetterFromAuthor}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-medium">{author}</h2>

                  {renderRating()}
                </div>
                <p className="text-slate-400 text-sm">
                  Written on {updateDateFormat(created_at)}
                </p>
              </div>
            </div>

            {isUser && (
              <div>
                <button
                  ref={triggerRef}
                  onClick={() => setOpenReviewPopup(true)}
                  className="px-5 py-2 bg-slate-600  rounded-full hover:bg-slate-500 transition-colors duration-200 font-semibold"
                >
                  Edit Review
                </button>
                {openReviewPopup && (
                  <ReviewPopup
                    show={show}
                    type={type}
                    onClose={() => setOpenReviewPopup(false)}
                    triggerRef={triggerRef}
                    forUpdateReview={true}
                  />
                )}
              </div>
            )}

            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex
              items-center gap-2 text-slate-400 hover:text-white transition-colors
              duration-200"
              >
                <span>TMDB</span>
                <FiExternalLink />
              </a>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div
              className={`prose prose-invert max-w-none ${
                !isReadMore && "line-clamp-3"
              } space-y-4`}
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />

            {content.length > 300 && (
              <button
                onClick={() => setIsReadMore(!isReadMore)}
                className="text-slate-400 hover:text-white font-medium ml-auto block transition-colors duration-200"
              >
                {isReadMore ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
