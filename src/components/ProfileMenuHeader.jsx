import { Link } from "react-router-dom";
import UserAvatar from "../ui/UserAvatar";
import { useSelector } from "react-redux";

const ProfileMenuHeader = ({ onClose }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { email, username } = useSelector((state) => state.user.user);
  const userPath = username.replace(" ", "-");

  return (
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
  );
};

export default ProfileMenuHeader;
