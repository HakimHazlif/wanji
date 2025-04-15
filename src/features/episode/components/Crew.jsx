import { useEpisode } from "../useEpisode";
import CreditCard from "../../person/components/CreditCard";

const Crew = () => {
  const { episodeCredits } = useEpisode();
  const { crew } = episodeCredits;

  return (
    <section className="max-w-[500px] min-w-[400px] py-7 px-5  rounded-xl">
      <h3 className="text-xl font-bold mb-5">Crew</h3>
      <ul className="grid grid-flow-row gap-5">
        {crew?.map((crewer, index) => (
          <CreditCard
            person={crewer}
            size="small"
            direction="row"
            key={`${crewer.id}-${index}`}
          />
        ))}
      </ul>
    </section>
  );
};

export default Crew;
