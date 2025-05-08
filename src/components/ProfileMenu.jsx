import ProfileElements from "./ProfileElement";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import SpinnerMini from "../ui/SpinnerMini";
import AuthButton from "../features/authentication/components/AuthButton";
import ProfileMenuHeader from "./ProfileMenuHeader";
import ListsNav from "../features/userLists/components/ListsNav";
import { useSession } from "../context/SessionContext";

const ProfileMenu = ({ onClose, buttonRef }) => {
  const menuRef = useRef();
  const { user, status } = useSelector((state) => state.user);
  const { handleLogOut } = useSession();

  const { username } = user;
  const userPath = username.replace(" ", "-");

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
      <ProfileMenuHeader onClose={onClose} />

      <ul className="font-medium">
        <ProfileElements
          route={`/u/${userPath}`}
          itemName="View Profile"
          icon={<FaRegUser />}
          onClose={onClose}
        />
        <ProfileElements
          itemName="Settings"
          route={`/u/${userPath}/settings/profile`}
          icon={<IoSettingsOutline />}
          onClose={onClose}
        />
      </ul>

      <hr className="border-[1.5px] my-2" />

      <ListsNav onClose={onClose} />

      <hr className="border-[1.5px] my-2" />

      <AuthButton
        style="w-full bg-red-500 text-white hover:bg-red-600"
        handleClick={() => handleLogOut(onClose)}
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
    </aside>
  );
};

export default ProfileMenu;
