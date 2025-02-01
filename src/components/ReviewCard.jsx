import { useState } from "react";
import { getImageViaPath, updateDateFormat } from "../utils/helper";
import { FaStar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const ReviewCard = ({ review }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const { author, author_details, content, created_at, url } = review;

  const formattedContent = content
    .split("\r\n\r\n")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  function hundleClick() {
    setIsReadMore(!isReadMore);
  }

  const getFirstLetterFromAuthor = author[0];

  const renderRating = () => {
    const rating = author_details?.rating;
    if (!rating) return null;

    return (
      <div className="rounded-md bg-orange-amber w-[45px] h-6  flex items-center justify-center gap-1 text-xs font-bold">
        <FaStar />
        <p>{rating?.toFixed(1)}</p>
      </div>
    );
  };

  return (
    <div className="bg-bluish-black p-10 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div>
            {author_details?.avatar_path ? (
              <img
                src={getImageViaPath(author_details.avatar_path, 400)}
                alt={`${author}'s avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-green-500 capitalize text-3xl flex justify-center items-center">
                {getFirstLetterFromAuthor}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-4">
              <h2 className="text-xl font-medium">{author}</h2>
              {renderRating()}
            </div>
            <p className="text-slate-400 text-sm">
              Written on {updateDateFormat(created_at)}
            </p>
          </div>
        </div>
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

      <div className="mt-7 space-y-2">
        <div
          className={`prose prose-invert max-w-none ${
            !isReadMore && "line-clamp-3"
          } space-y-4`}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        {content.length > 300 && (
          <button
            onClick={() => setIsReadMore(!isReadMore)}
            className="text-slate-400 hover:text-white font-medium ml-auto block transition-colors duration-200 pt-5"
          >
            {isReadMore ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
