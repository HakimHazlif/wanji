import CreditCard from "../../components/CreditCard";
import Spinner from "../../ui/Spinner";
import ListScroll from "../lists/ListScroll";
import { usePopularPeople } from "./usePopularPeople";

const PopularPeople = () => {
  const { isLoading, popularPeople } = usePopularPeople();

  if (isLoading) return <Spinner />;

  return (
    <div className="padding-x pt-32">
      <ListScroll title="Popular People">
        {popularPeople?.map((person) => (
          <CreditCard key={person.id} person={person} inHomePage={true} />
        ))}
      </ListScroll>
    </div>
  );
};

export default PopularPeople;
