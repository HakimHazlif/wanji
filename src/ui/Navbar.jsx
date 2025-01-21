import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center gap-20">
      <ul className="flex text-gray-100 gap-10 font-semibold ">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/tv-shows">TV Sows</NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
