import { useEpisode } from "../features/episode/useEpisode";
import Spinner from "../ui/Spinner";
import { getPictureUrlFormat } from "../utils/helper";

import EpisodeInfo from "../features/episode/EpisodeInfo";
import ShowImages from "../features/show/ShowImages";
import Crew from "../features/episode/Crew";
import Casting from "../features/episode/Casting";
import { Link } from "react-router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Episode = () => {
  const { isLoading, episodeDetails, episodesList, episodeImage } =
    useEpisode();

  if (isLoading) return <Spinner />;

  const { episode_number, season_number } = episodeDetails;
  const showId = episodesList[0]?.show_id;

  return (
    <main className="pt-60 pb-20">
      <div className="padding-x ">
        <EpisodeInfo />
        <section className="flex gap-10 py-32">
          <div>
            <ShowImages images={episodeImage} />
            <Casting />
          </div>
          <Crew />
        </section>
        <div
          className={`flex items-center py-10 ${
            episode_number === 1 ? "justify-end" : "justify-between"
          } `}
        >
          {episode_number !== 1 && (
            <Link
              to={`/tv/${showId}/season/${season_number}/episode/${
                episode_number - 1
              }`}
              className="flex gap-2 items-center text-xl font-bold hover:text-orange-coral"
            >
              <IoIosArrowBack className="text-2xl" />
              <h2>Go back to episode {episode_number - 1}</h2>
            </Link>
          )}
          {episode_number < episodesList.length && (
            <Link
              to={`/tv/${showId}/season/${season_number}/episode/${
                season_number + 1
              }`}
              className="flex gap-2 items-center text-xl font-bold hover:text-orange-coral"
            >
              <h2>Go to episode {episode_number + 1}</h2>
              <IoIosArrowForward className="text-2xl" />
            </Link>
          )}
        </div>
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
