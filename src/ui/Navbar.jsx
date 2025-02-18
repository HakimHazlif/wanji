import { useEffect, useRef, useState } from "react";
import { BiSolidFilm } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { IoIosHome, IoIosTv } from "react-icons/io";
import { Link, NavLink } from "react-router";
import ProfileElements from "../components/ProfileElement";
import { FaFilm } from "react-icons/fa";
import { IoHomeOutline, IoTvOutline } from "react-icons/io5";

const styleClassName =
  "font-medium font-roboto text-sm rounded-xl w-[100px] duration-200 transition-colors";

const navbarElements = [
  {
    itemName: "Home",
    icon: <IoHomeOutline className="md:hidden" />,
    navigationPath: "/",
  },
  {
    itemName: "Movies",
    icon: <FaFilm className="md:hidden" />,
    navigationPath: "/movies?movie-tag=popular&page=1",
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
  const navMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideOfPopup(e) {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsNavMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideOfPopup);

    return () =>
      document.removeEventListener("mousedown", handleClickOutsideOfPopup);
  }, []);

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
        <nav
          className="px-4 py-3 rounded-lg absolute right-0 top-full bg-white font-medium z-40 text-black"
          ref={navMenuRef}
        >
          <ul className="grid grid-flow-row pb-1 border-b border-slate-400">
            {navbarElements.map((nav) => (
              <ProfileElements
                key={nav.itemName}
                icon={nav.icon}
                itemName={nav.itemName}
                route={nav.navigationPath}
                onClose={() => setIsNavMenuOpen(false)}
              />
            ))}
          </ul>
          <div className="flex gap-2 mt-3 mb-1">
            <Link to="/signup">
              <button
                className={`${styleClassName} border-2 border-orange-coral hover:bg-orange-200 hover:text-slate-900 py-1.5`}
              >
                Sign up
              </button>
            </Link>
            <Link to="/login">
              <button
                className={`${styleClassName} bg-orange-amber hover:bg-orange-coral text-slate-900 py-2`}
              >
                Log in
              </button>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
