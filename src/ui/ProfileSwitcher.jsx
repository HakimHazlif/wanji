import ProfileMenu from "../components/ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUser } from "../features/authentication/api/apiAuth";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import AuthButton from "../features/authentication/components/AuthButton";

const ProfileSwitcher = () => {
  const { transitionNavigate } = useTransitionNavigate();
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
            <div className="sm:w-[27px] sm:h-[27px] w-[25px] h-[25px] rounded-full overflow-hidden ring-2 ring-orange-coral">
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
          <AuthButton
            handleClick={() => transitionNavigate("/signup")}
            style="border border-amber-300 hover:border-amber-500 text-amber-300 hover:text-amber-500 w-[90px]"
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
    </div>
  );
};

export default ProfileSwitcher;
