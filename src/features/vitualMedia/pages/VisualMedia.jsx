import { useVitualMedia } from "../hooks/useVitualMedia";
import MediaIntro from "../components/MediaIntro";
import MediaDetails from "../components/MediaDetails";
import ListScroll from "../../../components/ListScroll";
import MediaReviews from "../../reviews/components/MediaReviews";
import Spinner from "../../../ui/Spinner";
import { getPictureUrlFormat } from "../../../utils/helper";
import MediaCard from "../../../ui/MediaCard";
import MediaImages from "../../../components/MediaImages";
import SeasonsList from "../../season/components/SeasonsList";
import { useParams } from "react-router-dom";
import CreditCard from "../../person/components/CreditCard";
import MediaOverview from "../components/MediaOverview";
import { useItemStatus } from "../../userLists/hooks/useItemStatus";

const VisualMedia = () => {
  const { isLoading, details, similar, images, credits, reviews } =
    useVitualMedia();

  const { category } = useParams();

  const { isLoading: isFeaturesLoading } = useItemStatus();

  if (isLoading || isFeaturesLoading) return <Spinner />;

  return (
    <div className="pb-20 padding-x">
      <MediaIntro />

      <section className="pt-20 flex md:flex-row flex-col items-start justify-between xl:gap-32 md:gap-20 gap-16 mt-8">
        <MediaOverview />
        {images?.length > 0 && (
          <div className="md:w-3/5 w-full font-medium flex flex-col gap-4">
            <MediaImages images={images} />
          </div>
        )}
      </section>

      <MediaDetails />

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
            <MediaCard key={show.id} show={show} category={category} />
          ))}
        </ListScroll>
      </section>

      <section className="pt-32">
        <MediaReviews reviews={reviews} show={details} category={category} />
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

export default VisualMedia;
