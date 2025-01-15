import { useSeason } from "../features/season/useSeason";
import Spinner from "../ui/Spinner";

const Season = () => {
  const { isLoading } = useSeason();

  if (isLoading) return <Spinner />;

  return <div>Season</div>;
};

export default Season;
