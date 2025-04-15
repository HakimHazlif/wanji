import EpisodesList from "../components/EpisodesList";
import HeaderBackDrop from "../../../ui/HeaderBackDrop";
import Spinner from "../../../ui/Spinner";
import SeasonIntro from "../components/SeasonIntro";
import { useSeason } from "../hooks/useSeason";
import { getPictureUrlFormat } from "../../../utils/helper";

const Season = () => {
  const { isLoading, seasonDetails } = useSeason();

  if (isLoading) return <Spinner />;

  return (
    <div className="pb-10">
      <div className="padding-x">
        <SeasonIntro />
        <section className="pt-32">
          <EpisodesList />
        </section>
      </div>

      <HeaderBackDrop
        backdrop={getPictureUrlFormat(seasonDetails.poster_path, 1280)}
        alt="backdrop"
      />
    </div>
  );
};

export default Season;
