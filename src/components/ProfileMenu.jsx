import ProfileElements from "./ProfileElement";
import { profileMenuElements } from "../constants/uiElements";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const ProfileMenu = ({ setHandle, onClose }) => {
  const menuRef = useRef();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const { avatar, username, email } = user;

  useEffect(() => {
    function handleDropMenu(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    }

    document.addEventListener("mousedown", handleDropMenu);

    return () => document.removeEventListener("mousedown", handleDropMenu);
  }, [menuRef, onClose]);

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
        <>
          {profileMenuElements.map((item, index) => (
            <ul key={index}>
              {index < profileMenuElements.length && (
                <hr className="border-[1.5px] my-2" />
              )}
              {item.map((element) => (
                <ProfileElements
                  key={element.id}
                  icon={element.iconSVG}
                  route={element.route}
                  itemName={element.name}
                />
              ))}
            </ul>
          ))}
        </>
      </aside>
    </div>
  );
};

export default ProfileMenu;
