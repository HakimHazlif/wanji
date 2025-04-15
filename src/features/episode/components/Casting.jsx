import { useEpisode } from "../useEpisode";
import CastList from "../CastList";

const Casting = () => {
  const { episodeCredits } = useEpisode();
  const { cast, guest_stars } = episodeCredits;

  return (
    <section className="py-20">
      <CastList cast={cast} title="The main cast" />
      <hr className="my-20 border-slate-500" />
      <CastList cast={guest_stars} title="The guest cast" />
    </section>
  );
};

export default Casting;
