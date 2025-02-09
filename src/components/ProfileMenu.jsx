import ProfileElements from "./ProfileElement";
import { profileMenuElements } from "../constants/uiElements";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { useLists } from "../features/lists/useLists";
import { BsBookmarkCheck } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdChecklistRtl } from "react-icons/md";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { fetchItemsList } from "../services/apiLists";
import { logout } from "../services/apiAuth";

const ProfileMenu = ({ setHandle, onClose, buttonRef }) => {
  const dispatch = useDispatch();
  const menuRef = useRef();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const { avatar, username, email } = user;

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
    <div className="absolute z-40 right-0 top-0 cursor-default" ref={menuRef}>
      <aside className="bg-white absolute right-28 top-16 z-40 text-black w-[300px] max-w-[380px] min-w-[200px]  rounded-lg py-3 px-3">
        <div className="flex gap-4 justify-start items-center px-3 pt-3 pb-4">
          <div className="bg-orange-coral w-11 h-11 rounded-full flex justify-center items-center relative">
            {avatar ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <i className="fa-solid fa-user text-xl"></i>
            )}
            {isLoggedIn && (
              <div className="absolute w-[10px] h-[10px] bg-green-500 rounded-full bottom-[4px] right-0"></div>
            )}
          </div>
          <div>
            <p className="font-bold text-xl">{username}</p>
            <p className="text-slate-500 font-medium text-sm">{email}</p>
          </div>
        </div>
        <ul>
          <ProfileElements
            route={`/u/${username}`}
            itemName="View Profile"
            icon={<FaRegUser />}
            onClick={onClose}
          />
        </ul>
        <hr className="border-[1.5px] my-2" />

        <ul>
          <ProfileElements
            itemName="Watchlist"
            route={`/u/${username}/Watchlist`}
            icon={<BsBookmarkCheck />}
            onClick={onClose}
          />
          <ProfileElements
            itemName="Favorites"
            route={`/u/${username}/Favorites`}
            icon={<IoMdHeartEmpty />}
            onClick={onClose}
          />
          <ProfileElements
            itemName="My Lists"
            route={`/u/${username}/Lists`}
            icon={<MdChecklistRtl />}
            onClick={onClose}
          />
        </ul>
        <hr className="border-[1.5px] my-2" />
        <ul>
          <ProfileElements
            itemName="Settings"
            route={`/u/${username}/settings`}
            icon={<IoSettingsOutline />}
            onClick={onClose}
          />
          <ProfileElements
            itemName="Log out"
            route="/"
            icon={<IoLogOutOutline />}
            onClick={() => {
              onClose();
              dispatch(logout());
            }}
          />
        </ul>
      </aside>
    </div>
  );
};

export default ProfileMenu;
