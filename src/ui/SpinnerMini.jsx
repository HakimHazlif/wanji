import { BiLoaderAlt } from "react-icons/bi";

const SpinnerMini = ({ iconSize = "md:text-xl sm:text-lg text-base" }) => {
  return <BiLoaderAlt className={`spinner-mini ${iconSize}`} />;
};

export default SpinnerMini;
