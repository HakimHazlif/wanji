import EmptyPoster from "../../components/EmptyPoster";
import { getPictureUrlFormat } from "../../utils/helper";

const ReviewPopupHeader = ({ show }) => {
  return (
    <div className="flex items-end gap-4 pb-4 px-4">
      <div>
        {show?.poster_path ? (
          <img
            src={getPictureUrlFormat(show?.poster_path)}
            alt="poster"
            className="rounded-md w-[100px] min-w-[80px] object-cover"
          />
        ) : (
          <EmptyPoster />
        )}
      </div>
      <div>
        <p className="text-lg text-slate-300">What did you think?</p>
        <p className="text-sm text-slate-400">
          Write a review about{" "}
          <span className="text-orange-amber ">
            {show?.title || show?.name}
          </span>{" "}
          and share your thoughts. You can also add watched dates as many times
          as you have rewatched it.
        </p>
      </div>
    </div>
  );
};

export default ReviewPopupHeader;
