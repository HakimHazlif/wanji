import { Link } from "react-router-dom";
import { getPictureUrlFormat } from "../utils/helper";
import EmptyPoster from "../components/EmptyPoster";
import { FaUser } from "react-icons/fa";

const SearchItem = ({ id, image, title, originalTitle, mediaType }) => {
  return (
    <Link
      to={`${mediaType}/${id}`}
      className="flex justify-between px-6 max-sm:px-3 items-center w-full cursor-pointer hover:bg-slate-300 py-3 text-black"
    >
      <div className="flex gap-2 items-center w-[85%]">
        {image ? (
          <img
            src={getPictureUrlFormat(image, 500)}
            alt="poster"
            className="h-[50px] w-auto rounded-sm"
          />
        ) : mediaType === "person" ? (
          <div className="h-[50px] rounded-md  aspect-[2/3] bg-gray-900 flex items-center justify-center">
            <FaUser size={15} className="text-gray-600" />
          </div>
        ) : (
          <EmptyPoster size={15} style="h-[50px] rounded-md" />
        )}

        <h4 className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-sm:text-sm">
          {title}{" "}
          <span className="font-medium text-slate-700 text-sm max-sm:text-xs">
            {originalTitle !== title && `(${originalTitle})`}
          </span>
        </h4>
      </div>
      <span className="text-sm max-sm:text-xs text-slate-600 font-medium">
        #{mediaType}
      </span>
    </Link>
  );
};

export default SearchItem;
