import { useSelector } from "react-redux";

const UserAvatar = ({ size, textSize = "text-lg" }) => {
  const { username, avatar } = useSelector((state) => state.user.user);

  return (
    <div
      className={`${size} rounded-full overflow-hidden ring-2 ring-orange-coral`}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={username}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <div
          className={`w-full h-full flex justify-center items-center bg-orange-coral ${textSize} text-slate-200 capitalize `}
        >
          {username.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
