import { useRef, useState } from "react";
import {
  formatNumber,
  getImageViaPath,
  updateDateFormat,
} from "../utils/helper";
import { FiExternalLink } from "react-icons/fi";
import ReviewPopup from "../features/reviews/components/ReviewPopup";
import UserRateMini from "../features/userLists/buttons/UserRateMini";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import { Box, Rating } from "@mui/material";

const ReviewCard = ({
  review,
  isUser = false,
  isProfileList = false,
  show = null,
  type = null,
}) => {
  const { transitionNavigate } = useTransitionNavigate();
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

  const avatar =
    author_details?.avatar_path?.slice(0, 5) === "https"
      ? author_details?.avatar_path
      : getImageViaPath(author_details?.avatar_path, 400);

  const getFirstLetterFromAuthor = author[0];

  const rating = isProfileList ? null : author_details?.rating ?? 0;

  return (
    <div
      className={`${isUser ? "" : "border-t border-bluish-black"} pt-6 pb-10`}
    >
      <div className="flex gap-6 w-full">
        {isProfileList && (
          <div className="w-32 flex-shrink-0">
            <div
              className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() =>
                transitionNavigate(`/${review.type}/${review.itemId}`)
              }
            >
              <img
                src={getImageViaPath(review?.posterPath, 400)}
                alt={review?.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex sm:flex-row flex-col items-start gap-10 w-full">
          <div className="flex sm:flex-col flex-row gap-5 max-sm:w-full max-sm:justify-between max-sm:items-center">
            <div className="flex gap-4 items-start md:w-60 w-52">
              <div>
                {author_details?.avatar_path ? (
                  <img
                    src={avatar}
                    alt={`${author}'s avatar`}
                    className="lg:w-[75px] md:w-[70px] sm:w-[65px] w-[50px]  aspect-square rounded-full object-cover ring-2 ring-orange-coral"
                  />
                ) : (
                  <div className="lg:w-[75px] md:w-[70px] sm:w-[65px] w-[50px] aspect-square rounded-full bg-green-500 capitalize text-3xl flex justify-center items-center">
                    {getFirstLetterFromAuthor}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <h2 className={`md:text-lg text-base font-medium`}>
                    {author}
                  </h2>
                </div>
                <p className="text-slate-400 md:text-sm text-xs">
                  {updateDateFormat(created_at)}
                </p>
              </div>
            </div>
            {isUser && (
              <div className="">
                <button
                  ref={triggerRef}
                  onClick={() => setOpenReviewPopup(true)}
                  className="sm:w-full xs:px-7 px-4 py-2 bg-slate-600 rounded-full hover:bg-slate-500 transition-colors duration-200 font-semibold sm:text-base xs:text-sm text-xs"
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
          </div>

          <div className="w-full">
            <div className="mb-5 flex w-full justify-between">
              {rating !== null && isUser ? (
                <UserRateMini
                  item={item}
                  addStars={true}
                  starsColorFilled="#ffbf00"
                  buttonStyle="w-[32px] text-center text-sm rounded-sm bg-orange-amber font-semibold text-gray-800"
                />
              ) : (
                <div className="flex items-center justify-center gap-2 cursor-pointer">
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
                          color: "#ffbf00",
                        },
                      }}
                    />
                  </Box>

                  <div className="w-[32px] text-center text-sm rounded-sm bg-orange-amber font-semibold text-gray-800">
                    <span>{formatNumber(rating)}</span>
                  </div>
                </div>
              )}

              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex
              items-center gap-2 text-slate-400 hover:text-white transition-colors
              duration-200 w-full justify-end"
                >
                  <span>TMDB</span>
                  <FiExternalLink />
                </a>
              )}
            </div>
            <div>
              <div className="w-full">
                <p
                  className={`whitespace-pre-wrap w-full md:text-base text-sm ${
                    !isReadMore && "line-clamp-4"
                  } space-y-4`}
                >
                  {content}
                </p>

                {content.length > 300 && (
                  <button
                    onClick={() => setIsReadMore(!isReadMore)}
                    className="mt-5 text-slate-400 hover:text-white font-medium ml-auto block transition-colors duration-200"
                  >
                    {isReadMore ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
