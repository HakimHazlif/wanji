import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center gap-20">
      <ul className="flex text-gray-100 gap-10 font-semibold ">
        <Link to="/">Home</Link>
        <li>Movies</li>
        <li>TV Sows</li>
      </ul>
    </nav>
  );
};

export default Navbar;
