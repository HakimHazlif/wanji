import CreditCard from "../../components/CreditCard";
import Spinner from "../../ui/Spinner";
import ListScroll from "../lists/ListScroll";
import { useTrendingPeople } from "./useTrendingPeople";

const TrendingPeople = () => {
  const { isLoading, trendingPeople } = useTrendingPeople();

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
