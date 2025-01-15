import ProfilesScroll from "../../components/ProfilesScroll";

import { getMainCrewRulls } from "../../utils/helper";
import { useShow } from "./useShow";

const ShowCredite = () => {
  // console.log(credits);
  const { credits } = useShow();

  return (
    <section className="py-10">
      <ProfilesScroll title="Casting" credit={credits.cast} />
    </section>
  );
};

export default ShowCredite;
