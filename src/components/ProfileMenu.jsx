import ProfileElements from "./ProfileElement";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { BsBookmarkCheck } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdChecklistRtl } from "react-icons/md";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { logout } from "../features/authentication/api/apiAuth";
import UserAvatar from "../ui/UserAvatar";
import { FaRegStar } from "react-icons/fa6";

const ProfileMenu = ({ onClose, buttonRef }) => {
  const dispatch = useDispatch();
  const menuRef = useRef();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const { username, email } = user;
  const userPath = username.replace(" ", "-");

  // const { watchlist, favoriteList, remainLists } = useLists();

  useEffect(() => {
    function handleDropMenu(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      )
        onClose();
    }

    document.addEventListener("mousedown", handleDropMenu);

    return () => document.removeEventListener("mousedown", handleDropMenu);
  }, [menuRef, onClose, buttonRef]);

  return (
    <aside
      className="bg-white absolute right-0 sm:top-8 top-7 z-50 text-black w-[270px] max-w-[320px] min-w-[230px]  rounded-lg py-3 px-3"
      ref={menuRef}
    >
      <Link
        to={`/u/${userPath}`}
        className="flex gap-4 justify-start items-center px-3 pt-3 pb-4 "
        onClick={onClose}
      >
        <div className="relative">
          <UserAvatar size="w-11 h-11" textSize="text-xl" />

          {isLoggedIn && (
            <div className="absolute z-30 w-[10px] h-[10px] bg-green-500 rounded-full bottom-[0px] right-0"></div>
          )}
        </div>
        <div>
          <p className="font-bold text-xl">{username}</p>
          <p className="text-slate-500 font-medium text-sm">{email}</p>
        </div>
      </Link>
      <ul className="font-medium">
        <ProfileElements
          route={`/u/${userPath}`}
          itemName="View Profile"
          icon={<FaRegUser />}
          onClose={onClose}
        />
      </ul>
      <hr className="border-[1.5px] my-2" />

      <ul className="font-medium">
        <ProfileElements
          itemName="My Watchlist"
          route={`/u/${userPath}/Watchlist`}
          icon={<BsBookmarkCheck />}
          onClose={onClose}
        />
        <ProfileElements
          itemName="My Favorites"
          route={`/u/${userPath}/Favorites`}
          icon={<IoMdHeartEmpty />}
          onClose={onClose}
        />
        <ProfileElements
          itemName="My Lists"
          route={`/u/${userPath}/Lists`}
          icon={<MdChecklistRtl />}
          onClose={onClose}
        />
        <ProfileElements
          itemName="My ratings"
          route={`/u/${userPath}/Ratings`}
          icon={<FaRegStar />}
          onClose={onClose}
        />
      </ul>
      <hr className="border-[1.5px] my-2" />
      <ul className="font-medium">
        <ProfileElements
          itemName="Settings"
          route={`/u/${userPath}/settings/profile`}
          icon={<IoSettingsOutline />}
          onClose={onClose}
        />
        <ProfileElements
          itemName="Log out"
          route="/"
          icon={<IoLogOutOutline />}
          onClose={() => {
            onClose();
            dispatch(logout());
          }}
        />
      </ul>
    </aside>
  );
};

export default ProfileMenu;
