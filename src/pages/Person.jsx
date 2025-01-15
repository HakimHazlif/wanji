import { useParams } from "react-router";

const Person = () => {
  const { id } = useParams();

  return <div>Person</div>;
};

export default Person;
