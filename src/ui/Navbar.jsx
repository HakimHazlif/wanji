import { useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import NavMenuDrop from "../components/NavMenuDrop";
import { IoHomeOutline, IoTvOutline } from "react-icons/io5";
import { FaFilm } from "react-icons/fa";

const navbarElements = [
  {
    itemName: "Home",
    icon: <IoHomeOutline className="md:hidden" />,
    navigationPath: "/",
  },
  {
    itemName: "Movies",
    icon: <FaFilm className="md:hidden" />,
    navigationPath: "/movies?movies-tag=popular&page=1",
  },
  {
    itemName: "TV Shows",
    icon: <IoTvOutline className="md:hidden" />,
    navigationPath: "/tv-shows?tv-tag=popular&page=1",
  },
];

const Navbar = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  function handleClose() {
    setIsNavMenuOpen(false);
  }

  return (
    <div className="relative flex items-center">
      <nav className="">
        <ul className="md:flex text-gray-100 gap-10 font-semibold hidden">
          {navbarElements.map((nav) => (
            <NavLink
              key={nav.itemName}
              to={nav.navigationPath}
              className="hover:text-orange-coral transition-colors duration-200 font-medium flex items-center gap-3 text-lg"
            >
              {nav.itemName}
            </NavLink>
          ))}
        </ul>
      </nav>

      <button
        ref={buttonRef}
        className="md:hidden hover:text-orange-coral text-slate-300 transition-colors duration-150"
        onClick={(e) => {
          e.stopPropagation();
          setIsNavMenuOpen((prev) => !prev);
        }}
      >
        <FiMenu size={30} />
      </button>

      {isNavMenuOpen && (
        <NavMenuDrop handleClose={handleClose} buttonRef={buttonRef} />
      )}
    </div>
  );
};

export default Navbar;
