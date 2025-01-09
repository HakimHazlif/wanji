import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProfileElements = ({ icon, itemName, route }) => {
  const { username } = useSelector((state) => state.user.user);

  return (
    <li>
      <Link
        to={route === "Sign out" ? route() : route(username)}
        className="flex items-center justify-start gap-4 px-3 py-2 hover:text-orange-coral hover:border hover:border-orange-amber hover:bg-amber-50  rounded-md cursor-pointer"
        onClick={onclick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-0.5 -0.5 16 16"
          fill="currentColor"
          id="User--Streamline-Phosphor"
          className="w-5 h-5"
        >
          <path d={icon} strokeWidth="1"></path>
        </svg>
        <span>{itemName}</span>
      </Link>
    </li>
  );
};

export default ProfileElements;
