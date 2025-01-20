import { Link } from "react-router";
import { getPictureUrlFormat } from "../utils/helper";

const SearchItem = ({ id, image, title, originalTitle, mediaType }) => {
  let linkToNavigate;
  if (mediaType === "movie") linkToNavigate = `movie/${id}`;
  if (mediaType === "tv") linkToNavigate = `tv/${id}`;
  if (mediaType === "person") linkToNavigate = `person/${id}`;
  if (mediaType === "company") linkToNavigate = `company/${id}`;

  return (
    <Link
      to={linkToNavigate || "/"}
      className="flex justify-between px-6 items-center w-full cursor-pointer hover:bg-slate-300 py-3 text-black"
    >
      <div className="flex gap-2 items-center w-[90%]">
        <img
          src={getPictureUrlFormat(image, 500)}
          alt="poster"
          className="h-[50px] w-auto"
        />
        <h4 className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
          {title}{" "}
          <span className="font-medium text-slate-700 text-sm">
            {originalTitle !== title && `(${originalTitle})`}
          </span>
        </h4>
      </div>

      <span className="text-sm text-slate-600 font-medium">#{mediaType}</span>
    </Link>
  );
};

export default SearchItem;
