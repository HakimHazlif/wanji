import CreditCard from "../../components/CreditCard";

const CastList = ({ title, cast }) => {
  return (
    <div>
      <h3 className="text-4xl font-bold mb-10">{title}</h3>
      <div className="grid grid-cols-3 gap-10">
        {cast?.map((person) => (
          <CreditCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default CastList;
