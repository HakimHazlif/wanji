import { useShow } from "../features/show/useShow";
import ShowIntro from "../features/show/ShowIntro";
import ShowDetails from "../features/show/ShowDetails";
import ListScroll from "../features/lists/ListScroll";
import ShowReviews from "../features/show/ShowReviews";
import Spinner from "../ui/Spinner";
import { getPictureUrlFormat } from "../utils/helper";
import ShowCard from "../ui/ShowCard";
import ShowImages from "../features/show/ShowImages";
import SeasonsList from "../features/lists/SeasonsList";
import { useParams } from "react-router-dom";
import CreditCard from "../components/CreditCard";
import ShowOverview from "../features/show/ShowOverview";

const Show = () => {
  const { isLoading, details, similar, images, credits, reviews } = useShow();
  // const { isLoading: isStatusLoading } = useItemStatus();

  const { category } = useParams();

  if (isLoading) return <Spinner />;

  return (
    <div className="pb-20 padding-x">
      <ShowIntro />

      <section className="pt-20 flex md:flex-row flex-col items-start justify-between xl:gap-32 md:gap-20 gap-16 mt-8">
        <ShowOverview />
        {images?.length > 0 && (
          <div className="md:w-3/5 w-full font-medium flex flex-col gap-4">
            <ShowImages images={images} />
          </div>
        )}
      </section>

      <ShowDetails />

      {category === "tv" && (
        <section className="pt-32">
          <SeasonsList />
        </section>
      )}
      {credits?.cast.length > 0 && (
        <section className="pt-28">
          <ListScroll title="Cast">
            {credits?.cast?.map((person, index) => (
              <CreditCard
                key={`${person.id}-${index}`}
                person={person}
                inHomePage={false}
              />
            ))}
          </ListScroll>
        </section>
      )}
      {credits?.crew.length > 0 && (
        <section className="pt-20">
          <ListScroll title="Crew">
            {credits?.crew?.map((person, index) => (
              <CreditCard
                key={`${person.id}-${index}`}
                person={person}
                inHomePage={false}
              />
            ))}
          </ListScroll>
        </section>
      )}

      <section className="pt-32">
        <ListScroll title="More like this">
          {similar?.map((show) => (
            <ShowCard key={show.id} show={show} category={category} />
          ))}
        </ListScroll>
      </section>

      <section className="pt-32">
        <ShowReviews reviews={reviews} show={details} category={category} />
      </section>

      <div className="absolute top-0 right-0 w-full -z-10">
        <img
          src={getPictureUrlFormat(
            details?.backdrop_path || details?.poster_path,
            1280
          )}
          alt={`${details?.title || details?.name}'s backdrop`}
          className="h-[600px] w-full object-cover object-center masking"
        />
        <div className="bg-[#27283192] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>

      {/* <HeaderBackDrop backdrop={details?.backdrop_path || details?.poster_path} alt="backdrop" height="h-[600px]" /> */}
    </div>
  );
};

export default Show;
