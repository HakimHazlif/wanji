import { profile } from "../../assets/icons";
import { getPictureUrlFormat } from "../../utils/helper";
import { useEpisode } from "./useEpisode";

const Crew = () => {
  const { episodeCredits } = useEpisode();
  const { crew } = episodeCredits;

  return (
    <section className="max-w-[500px] min-w-[300px] py-7 px-5 bg-bluish-black rounded-xl">
      <h3 className="text-xl font-bold mb-5">Crew</h3>
      <ul className="grid grid-flow-row gap-5">
        {crew?.map((crewer) => (
          <li key={crewer.id} className="">
            <p className="mb-2 font-medium">{crewer.job}:</p>
            <div className="flex gap-3 items-center group cursor-pointer">
              <img
                src={
                  crewer.profile_path
                    ? getPictureUrlFormat(crewer.profile_path)
                    : profile
                }
                alt=""
                className="rounded-full h-10 w-10   object-cover "
              />

              <h4 className="font-bold group-hover:text-orange-amber">
                {crewer.name}
              </h4>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Crew;
