import AboutShow from "../../components/AboutShow";
import ProfilesScroll from "../../components/ProfilesScroll";

import { getMainCrewRulls } from "../../utils/helper";

const ShowCredite = ({ isMovie, credits }) => {
  // console.log(credits);

  const crew = getMainCrewRulls(credits.crew);

  return (
    <section className="py-10">
      <ProfilesScroll title="Casting" credit={credits.cast} />
    </section>
  );
};

export default ShowCredite;
