import React, { useState } from "react";
import { getImageViaPath, updateDateFormat } from "../utils/functions";

const ReviewCard = (props) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const { author, avatar, rating, content, date } = props;

  const formattedContent = content
    .split("\r\n\r\n")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  function hundleClick() {
    setIsReadMore(!isReadMore);
  }

  function getFirstLetterFromAuthor() {
    return author[0];
  }

  return (
    <div className="bg-slate-800 p-10 mr-5 rounded-lg">
      <div className="flex gap-4 items-center">
        <div>
          {avatar ? (
            <img
              src={getImageViaPath(avatar, 400)}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-green-500 capitalize text-3xl flex justify-center items-center">
              {getFirstLetterFromAuthor()}
            </div>
          )}
        </div>
        <div>
          <div className="flex gap-4">
            <h2 className="text-xl">{author}</h2>
            {rating && (
              <p className="w-10 bg-slate-600 text-center rounded-lg">
                {rating}
              </p>
            )}
          </div>
          <p>Written on {updateDateFormat(date)}</p>
        </div>
      </div>
      <div className="mt-7">
        <p
          className={`${
            !isReadMore && "line-clamp-3"
          } overflow-hidden text-ellipsis max-w-full space-y-4`}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        ></p>
        <div className="text-end">
          <button
            onClick={hundleClick}
            className="font-medium text-end mt-2 cursor-pointer hover:text-slate-400 duration-150 transition-all"
          >
            {isReadMore ? "less" : "read the rest"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
