import Spinner from "../../../ui/Spinner";
import { usePerson } from "../hooks/usePerson";
import { getPictureUrlFormat } from "../../../utils/helper";
import PersonWorks from "../components/PersonWorks";
import HeaderBackDrop from "../../../ui/HeaderBackDrop";
import PersonInfo from "../components/PersonInfo";

const Person = () => {
  const { isLoading, personImages } = usePerson();

  const backdrop = personImages?.[1]?.file_path ?? null;

  if (isLoading) return <Spinner />;

  return (
    <main className="padding-x pb-20">
      <PersonInfo />
      <PersonWorks />
      <HeaderBackDrop
        backdrop={getPictureUrlFormat(backdrop, 1280)}
        alt="backdrop"
      />
    </main>
  );
};

export default Person;
