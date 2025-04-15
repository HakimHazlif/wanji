import CreditCard from "../components/CreditCard";
import Spinner from "../../../ui/Spinner";
import { usePeople } from "../hooks/usePeople";
import ListScroll from "../../../components/ListScroll";

const PopularPeople = () => {
  const { isLoading, popularPeople } = usePeople();

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
