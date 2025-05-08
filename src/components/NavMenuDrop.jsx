import { useEffect, useRef } from "react";
import ProfileMenuHeader from "./ProfileMenuHeader";
import { useSelector } from "react-redux";
import ProfileElements from "./ProfileElement";
import ListsNav from "../features/userLists/components/ListsNav";
import AuthButton from "../features/authentication/components/AuthButton";
import { useSession } from "../context/SessionContext";
import SpinnerMini from "../ui/SpinnerMini";
import { IoHomeOutline, IoLogOutOutline, IoTvOutline } from "react-icons/io5";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
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

const NavMenuDrop = ({ handleClose, buttonRef }) => {
  const { isLoggedIn, status } = useSelector((state) => state.user);
  const { handleLogOut } = useSession();
  const { transitionNavigate } = useTransitionNavigate();

  const navMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideOfPopup(e) {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutsideOfPopup);

    return () =>
      document.removeEventListener("mousedown", handleClickOutsideOfPopup);
  }, [handleClose, buttonRef]);

  return (
    <nav
      className="px-4 py-3 rounded-lg absolute right-0 top-full bg-white font-medium z-50 text-black"
      ref={navMenuRef}
    >
      {isLoggedIn && <ProfileMenuHeader onClose={handleClose} />}

      {isLoggedIn && <hr className="border-[1.5px] my-2" />}

      <ul className="grid grid-flow-row">
        {navbarElements.map((nav) => (
          <ProfileElements
            key={nav.itemName}
            icon={nav.icon}
            itemName={nav.itemName}
            route={nav.navigationPath}
            onClose={handleClose}
          />
        ))}
      </ul>

      <hr className="border-[1.5px] my-2" />

      {isLoggedIn && <ListsNav onClose={handleClose} />}

      {isLoggedIn && <hr className="border-[1.5px] my-2" />}

      {isLoggedIn ? (
        <AuthButton
          style="w-full bg-red-500 text-white hover:bg-red-600"
          handleClick={() => handleLogOut(handleClose)}
          isHandling={status === "loading"}
        >
          {status === "loading" ? (
            <SpinnerMini />
          ) : (
            <>
              <IoLogOutOutline size={16} />
              <span>Log out</span>
            </>
          )}
        </AuthButton>
      ) : (
        <div className="flex gap-2 mt-3 mb-1">
          <AuthButton
            handleClick={() => transitionNavigate("/signup")}
            style="border border-amber-400 hover:border-amber-600 text-amber-400 hover:text-amber-600 w-[90px]"
          >
            Sign up
          </AuthButton>
          <AuthButton
            handleClick={() => transitionNavigate("/login")}
            style="bg-amber-400 hover:bg-amber-300 text-amber-700 w-[90px]"
          >
            Log in
          </AuthButton>
        </div>
      )}
    </nav>
  );
};

export default NavMenuDrop;
