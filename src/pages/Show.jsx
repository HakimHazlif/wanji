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
import ShowImages from "../features/show/ShowImages";
import SeasonsList from "../features/lists/SeasonsList";
import { useParams } from "react-router";

const Show = () => {
  const { isLoading, show, details, similar } = useShow();
  console.log(show);
  const { category } = useParams();

  const path = details?.backdrop_path || details?.poster_path;

  if (isLoading) return <Spinner />;

  return (
    <div className="py-10">
      <div className="padding-x">
        <ShowIntroDetails />
        {category === "tv" && <SeasonsList />}

        <section className="flex gap-10 py-32">
          <ShowImages />
          <ShowMoreDetails />
        </section>
        <ShowCredits />
        <List title="More like this">
          {similar?.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </List>

        {/* 
        <ShowSimilar similar={similar} />
        <ShowReviews reviews={reviews} /> */}
      </div>
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={getPictureUrlFormat(path, 1280)}
          alt="backdrop of movie"
          className="h-[600px] w-full object-cover object-center masking"
        />
        <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>
    </div>
  );
};

export default Show;
