import { Link } from "react-router";
import { useSession } from "../context/UserContext";
import Button from "../ui/Button";
import ProfileMenu from "../components/ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUser } from "../services/apiAuth";

const styleClassName =
  "font-medium font-roboto text-sm rounded-xl lg:w-[100px] md:w-[88px] w-[70px] duration-200 transition-colors";

const ProfileSwitcher = () => {
  const dispatch = useDispatch();

  const buttonRef = useRef();

  const [openProfileMenu, setOpenProfileMenu] = useState(false);
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
        <div className="relative">
          <button
            ref={buttonRef}
            className="flex items-center gap-2 group"
            onClick={toggleProfileMenu}
          >
            <div className="sm:w-[27px] sm:h-[27px] w-[22px] h-[22px] rounded-full overflow-hidden ring-2 ring-orange-coral">
              {avatar ? (
                <img
                  src={avatar}
                  alt={username}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-orange-coral hover:bg-orange-amber duration-150 transition-all text-sm md:text-lg sm:text-base text-slate-200 capitalize">
                  {username.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-lg font-medium max-sm:hidden group-hover:text-orange-coral duration-150 transition-colors">
              {username}
            </span>
          </button>

          {openProfileMenu ? (
            <ProfileMenu
              setHandle={toggleProfileMenu}
              buttonRef={buttonRef}
              onClose={() => setOpenProfileMenu(false)}
            />
          ) : null}
        </div>
      ) : (
        <div className="md:flex gap-2 hidden">
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
      )}
    </div>
  );
};

export default ProfileSwitcher;
