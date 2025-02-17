import { Link } from "react-router";
import { useSession } from "../context/UserContext";
import Button from "../ui/Button";
import ProfileMenu from "../components/ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUser } from "../services/apiAuth";

const styleClassName =
  "py-2 text-white font-medium font-roboto rounded-xl w-[100px] min-w-[70px] duration-200 transition-colors";

const ProfileSwitcher = () => {
  const dispatch = useDispatch();

  const buttonRef = useRef();

  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const { toggleLogsForm } = useSession();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { avatar, username } = useSelector((state) => state.user.user);

  function toggleProfileMenu(e) {
    e.stopPropagation();

    setOpenProfileMenu((prev) => !prev);
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button
            ref={buttonRef}
            className="h-[35px] w-[35px] rounded-full  overflow-hidden ring-2 ring-orange-coral"
            onClick={toggleProfileMenu}
          >
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-orange-coral hover:bg-orange-amber duration-150 transition-all text-lg text-slate-200 capitalize">
                {username.charAt(0)}
              </div>
            )}
          </button>

          {openProfileMenu ? (
            <ProfileMenu
              setHandle={toggleProfileMenu}
              buttonRef={buttonRef}
              onClose={() => setOpenProfileMenu(false)}
            />
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
