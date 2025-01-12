import { useParams } from "react-router";
import { useShow } from "../features/show/useShow";
import ShowDetails from "../features/show/ShowDetails";
// import ShowCredits from "../features/show/ShowCredits";
// import ShowSimilar from "../features/show/ShowSimilar";
// import ShowReviews from "../features/show/ShowReviews";

import Spinner from "../ui/Spinner";
import { getPictureUrlFormat } from "../utils/helper";

const Show = ({ isMovie }) => {
  const { id } = useParams();
  const showId = id;

  const { isLoading, details, credits, similar, reviews } = useShow(
    isMovie,
    showId
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="py-10">
      <div className="absolute top-0 -z-50 h-[600px] overflow-hidden ">
        <img
          src={getPictureUrlFormat(details.poster_path, 1280)}
          alt="backdrop"
          className="blur-lg object-cover object-top"
        />
        <div className="bg-black/50 h-full w-full absolute top-0"></div>
      </div>
      <div className="padding-x">
        <ShowDetails isMovie={isMovie} details={details} />
        {/* <ShowCredits credits={credits} />
        <ShowSimilar similar={similar} />
        <ShowReviews reviews={reviews} /> */}
      </div>
    </div>
  );
};

export default Show;
