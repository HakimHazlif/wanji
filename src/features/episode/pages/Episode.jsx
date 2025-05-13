import { useParams } from "react-router-dom";
import ListScroll from "../../../components/ListScroll";
import MediaImages from "../../../components/MediaImages";
import HeaderBackDrop from "../../../ui/HeaderBackDrop";
import Spinner from "../../../ui/Spinner";
import { getPictureUrlFormat } from "../../../utils/helper";
import CreditCard from "../../person/components/CreditCard";
import { useItemStatus } from "../../userLists/hooks/useItemStatus";
import EpisodeCard from "../components/EpisodeCard";
import EpisodeInfo from "../components/EpisodeInfo";

import { useEpisode } from "../hooks/useEpisode";

const Episode = () => {
  const {
    isLoading,
    episodeDetails,
    episodesList,
    episodeImage,
    episodeCredits,
  } = useEpisode();

  // console.log(episodeDetails);
  const { id, episodeNum, seasonNum } = useParams();
  // const { id: itemId } = episodeDetails;

  const { isLoading: isFeaturesLoading } = useItemStatus(
    episodeDetails?.id,
    "episode",
    id
  );

  if (isLoading || isFeaturesLoading) return <Spinner />;

  // const showId = episodesList?.[0]?.show_id;

  const episodes = episodesList?.filter(
    (episode) => episode.episode_number !== Number(episodeNum)
  );

  return (
    <div className="py-20 padding-x">
      <EpisodeInfo />

      <div className="pt-20 flex md:flex-row flex-col items-start justify-between xl:gap-32 md:gap-20 gap-16 mt-8">
        {episodeCredits?.cast.length > 0 && (
          <section className="md:w-1/2 w-full">
            <div className="flex items-end justify-between border-b border-slate-700 pb-3">
              <h2 className="heading-title-1">Main Cast</h2>
            </div>

            <div className="grid grid-cols-2 gap-10 gap-y-5 text-center my-5">
              {episodeCredits?.cast.map((person, index) => (
                <CreditCard
                  key={`${person.id}-${index}`}
                  person={person}
                  direction="row"
                  size="small"
                />
              ))}
            </div>
          </section>
        )}
        {episodeImage?.length > 0 && (
          <div className="md:w-1/2 w-full font-medium flex flex-col gap-4">
            <MediaImages images={episodeImage} />
          </div>
        )}
      </div>

      {episodeCredits?.guest_stars.length > 0 && (
        <section className="pt-28">
          <ListScroll title="Guest Stars">
            {episodeCredits?.guest_stars.map((person, index) => (
              <CreditCard
                key={`${person.id}-${index}`}
                person={person}
                inHomePage={false}
              />
            ))}
          </ListScroll>
        </section>
      )}
      {episodeCredits?.crew.length > 0 && (
        <section className="pt-28">
          <ListScroll title="Crew">
            {episodeCredits?.crew.map((person, index) => (
              <CreditCard
                key={`${person.id}-${index}`}
                person={person}
                inHomePage={false}
              />
            ))}
          </ListScroll>
        </section>
      )}

      <section className="pt-28">
        <div className="mb-10 border-b border-slate-700 pb-4 flex justify-between items-center">
          <h2 className="heading-title-1">
            The Reset of The Episodes of Season {seasonNum}
          </h2>
        </div>
        <div className="grid grid-flow-row gap-8">
          {episodes.length > 0 ? (
            <>
              {episodes.map((episode) => (
                <EpisodeCard episode={episode} key={episode.id} />
              ))}
            </>
          ) : (
            <div className="w-full h-[200px] bg-bluish-black rounded-2xl flex justify-center items-center font-bold text-xl">
              <p className="w-[450px] text-center">
                Sorry, there are no episodes available for this season.
              </p>
            </div>
          )}
        </div>
      </section>

      <HeaderBackDrop
        backdrop={getPictureUrlFormat(episodeDetails?.still_path, 1280)}
        alt="backdrop"
      />
    </div>
  );
};

export default Episode;
