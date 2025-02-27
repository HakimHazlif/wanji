import { useEpisode } from "../features/episode/useEpisode";
import Spinner from "../ui/Spinner";
import { getPictureUrlFormat } from "../utils/helper";

import EpisodeInfo from "../features/episode/EpisodeInfo";
import ShowImages from "../features/show/ShowImages";
import Crew from "../features/episode/Crew";
import Casting from "../features/episode/Casting";
import { Link, useParams } from "react-router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ShowCredite from "../features/show/ShowCredits";
import EpisodesList from "../features/season/EpisodesList";
import ListScroll from "../features/lists/ListScroll";
import ShowCard from "../ui/ShowCard";
import CreditCard from "../components/CreditCard";
import HeaderBackDrop from "../ui/HeaderBackDrop";
import EpisodeCard from "../features/episode/EpisodeCard";

const Episode = () => {
  const {
    isLoading,
    episodeDetails,
    episodesList,
    episodeImage,
    episodeCredits,
  } = useEpisode();

  if (isLoading) return <Spinner />;

  const { episode_number, season_number } = episodeDetails;
  const showId = episodesList?.[0]?.show_id;

  const episodes = episodesList?.filter(
    (episode) => episode.episode_number !== episode_number
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
            <ShowImages images={episodeImage} />
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
            The Reset of The Episodes of Season {season_number}
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
