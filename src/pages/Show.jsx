import { useShow } from "../features/show/useShow";
import ShowIntro from "../features/show/ShowIntro";
import ShowDetails from "../features/show/ShowDetails";
import ShowCredits from "../features/show/ShowCredits";
import ListScroll from "../features/lists/ListScroll";
import ShowReviews from "../features/show/ShowReviews";

import Spinner from "../ui/Spinner";
import { getPictureUrlFormat } from "../utils/helper";
import ShowCard from "../ui/ShowCard";
import ShowImages from "../features/show/ShowImages";
import SeasonsList from "../features/lists/SeasonsList";
import { useParams } from "react-router";

const Show = () => {
  const { isLoading, details, similar, images, credits, reviews, videos } =
    useShow();

  const { category } = useParams();

  if (isLoading) return <Spinner />;

  return (
    <main className="pt-32 pb-20">
      <div className="padding-x">
        <ShowIntro />

        <section className="pt-28">
          <ShowDetails />
        </section>

        {category === "tv" && (
          <section className="pt-32">
            <SeasonsList />
          </section>
        )}
        {credits?.cast.length > 0 && (
          <section className="pt-28">
            <ShowCredits title="Cast" creditsList={credits?.cast} />
          </section>
        )}
        {credits?.crew.length > 0 && (
          <section className="pt-20">
            <ShowCredits title="Crew" creditsList={credits?.crew} />
          </section>
        )}

        {images?.length > 0 && (
          <section className="pt-32">
            <ShowImages images={images} />
          </section>
        )}

        <section className="pt-32">
          <ListScroll title="More like this">
            {similar?.map((show) => (
              <ShowCard key={show.id} show={show} category={category} />
            ))}
          </ListScroll>
        </section>

        {reviews?.length > 0 && (
          <section className="pt-32">
            <ShowReviews
              reviews={reviews}
              itemId={details?.id}
              type={category}
            />
          </section>
        )}
      </div>
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={getPictureUrlFormat(
            details?.backdrop_path || details?.poster_path,
            1280
          )}
          alt="backdrop of movie"
          className="h-[600px] w-full object-cover object-center masking"
        />
        <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>
    </main>
  );
};

export default Show;
