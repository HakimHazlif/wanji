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

  return (
    <main className="pt-60 pb-20">
      <div className="padding-x">
        <EpisodeInfo />

        {episodeImage.length > 0 && (
          <section className="pt-36">
            <ShowImages images={episodeImage} />
          </section>
        )}
        {episodeCredits?.cast.length > 0 && (
          <section className="pt-28">
            <ShowCredite title="Cast" creditsList={episodeCredits?.cast} />
          </section>
        )}
        {episodeCredits?.guest_stars.length > 0 && (
          <section className="pt-20">
            <ShowCredite
              title="Guest Stars"
              creditsList={episodeCredits?.guest_stars}
            />
          </section>
        )}
        {episodeCredits?.crew.length > 0 && (
          <section className="pt-20">
            <ShowCredite title="Crew" creditsList={episodeCredits?.crew} />
          </section>
        )}

        <section className="pt-28">
          <ListScroll title="Episodes">
            {episodesList.map((episode) => (
              <ShowCard
                key={episode.id}
                show={episode}
                category="episode"
                parentShowId={showId}
              />
            ))}
          </ListScroll>
        </section>
      </div>
      <div className="absolute top-0 right-0 w-full -z-10 ">
        <img
          src={getPictureUrlFormat(episodeDetails?.still_path, 1280)}
          alt="backdrop of movie"
          className="h-[600px] w-full object-cover object-center masking"
        />
        <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
      </div>
    </main>
  );
};

export default Episode;
