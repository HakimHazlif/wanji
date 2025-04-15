import Spinner from "../../../ui/Spinner";
import { usePeople } from "../hooks/usePeople";
import ListScroll from "../../../components/ListScroll";
import CreditCard from "./CreditCard";

const TrendingPeople = () => {
  const { isLoading, trendingPeople } = usePeople();

  if (isLoading) return <Spinner />;

  return (
    <div className="padding-x pt-32">
      <ListScroll title="Trending People this Week">
        {trendingPeople?.map((person) => (
          <CreditCard key={person.id} person={person} inHomePage={true} />
        ))}
      </ListScroll>
    </div>
  );
};

export default TrendingPeople;
