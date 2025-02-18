import { Link } from "react-router";
import { logoDark } from "../assets/icons";

const Logo = () => {
  return (
    <Link to="/" className="text-center">
      <img
        src={logoDark}
        alt="Logo"
        className="w-[120px] min-w-[80px] h-auto"
      />
    </Link>
  );
};

export default Logo;
