import { Link } from "react-router";
import { useSession } from "../context/UserContext";
import Button from "../ui/Button";
import ProfileMenu from "../components/ProfileMenu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const styleClassName =
  "py-2 text-white font-medium font-roboto rounded-xl w-[100px] min-w-[70px] duration-200 transition-colors";

const ProfileSwitcher = () => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const { toggleLogsForm } = useSession();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { avatar } = useSelector((state) => state.user.user);

  function toggleProfileMenu() {
    setOpenProfileMenu((prev) => !prev);
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button
            className="bg-orange-coral py-1 px-2.5 rounded-full hover:bg-orange-amber duration-150 transition-all text-slate-200"
            onClick={toggleProfileMenu}
          >
            {avatar ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <i className="fa-solid fa-user text-xl"></i>
            )}
          </button>
          {openProfileMenu ? (
            <ProfileMenu setHandle={toggleProfileMenu} />
          ) : null}
        </>
      ) : (
        <div className="flex gap-2">
          <Link to="/signup" onClick={() => toggleLogsForm("signup")}>
            <Button
              stylish={`${styleClassName} border border-orange-amber hover:bg-amber-50 hover:text-[#0e0e6b]`}
            >
              Sign up
            </Button>
          </Link>
          <Link to="/login" onClick={() => toggleLogsForm("login")}>
            <Button
              stylish={`${styleClassName} bg-orange-amber hover:bg-orange-coral`}
            >
              Log in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileSwitcher;
