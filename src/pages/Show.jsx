import { useParams } from "react-router";
import { useShow } from "../features/show/useShow";
import ShowIntroDetails from "../features/show/ShowIntroDetails";
import ShowMoreDetails from "../features/show/ShowMoreDetails";
import ShowCredits from "../features/show/ShowCredits";
import List from "../features/lists/List";
// import ShowSimilar from "../features/show/ShowSimilar";
// import ShowReviews from "../features/show/ShowReviews";

import Spinner from "../ui/Spinner";
import { getMainCrewRulls, getPictureUrlFormat } from "../utils/helper";
import ShowCard from "../ui/ShowCard";

const Show = ({ isMovie }) => {
  const { id } = useParams();
  const showId = id;

  const { isLoading, details, credits, similar, reviews } = useShow(
    isMovie,
    showId
  );

  console.log(details);

  const crew = getMainCrewRulls(credits?.crew);

  if (isLoading) return <Spinner />;

  return (
    <div className="py-10">
      <div className="padding-x">
        <ShowIntroDetails isMovie={isMovie} details={details} />
        <ShowMoreDetails isMovie={isMovie} details={details} crew={crew} />
        <ShowCredits isMovie={isMovie} credits={credits} />
        <List title="Trending Movies">
          {similar.map((show) => (
            <ShowCard key={show.id} show={show} title={show.title} />
          ))}
        </List>
        {/* 
        <ShowSimilar similar={similar} />
        <ShowReviews reviews={reviews} /> */}
      </div>
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={getPictureUrlFormat(details.backdrop_path, 1280)}
          alt="backdrop of movie"
          className="h-[600px] w-full object-cover object-top masking"
        />
        <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>
    </div>
  );
};

export default Show;
