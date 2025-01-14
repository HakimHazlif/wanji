import { useParams } from "react-router";
import { useShow } from "../features/show/useShow";
import ShowDetails from "../features/show/ShowDetails";
import ShowCredits from "../features/show/ShowCredits";
// import ShowSimilar from "../features/show/ShowSimilar";
// import ShowReviews from "../features/show/ShowReviews";

import Spinner from "../ui/Spinner";
import { getMainCrewRulls, getPictureUrlFormat } from "../utils/helper";

const Show = ({ isMovie }) => {
  const { id } = useParams();
  const showId = id;

  const { isLoading, details, credits, similar, reviews } = useShow(
    isMovie,
    showId
  );

  const crew = getMainCrewRulls(credits?.crew);

  if (isLoading) return <Spinner />;

  return (
    <div className="py-10">
      <div className="padding-x">
        <ShowDetails isMovie={isMovie} details={details} crew={crew} />
        <ShowCredits isMovie={isMovie} credits={credits} />
        {/* 
        <ShowSimilar similar={similar} />
        <ShowReviews reviews={reviews} /> */}
      </div>
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={getPictureUrlFormat(details.poster_path, 1280)}
          alt="backdrop of movie"
          className="h-[600px] blur-lg w-full object-cover object-top masking"
        />
        <div className="bg-dark h-1/5 w-full absolute bottom-0 right-0 z-10"></div>
      </div>
    </div>
  );
};

export default Show;
