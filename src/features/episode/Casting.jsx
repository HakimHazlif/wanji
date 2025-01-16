import CastList from "./CastList";
import { useEpisode } from "./useEpisode";

const Casting = () => {
  const { episodeCredits } = useEpisode();
  const { cast, guest_stars } = episodeCredits;

  return (
    <section>
      <CastList cast={cast} title="The main cast" />
      <CastList cast={guest_stars} title="The guest cast" />
    </section>
  );
};

export default Casting;
