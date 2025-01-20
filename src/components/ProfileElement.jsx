import Spinner from "../ui/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { logout } from "../services/apiAuth";

const ProfileElements = ({ icon, itemName, route }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const { username } = useSelector((state) => state.user.user);

  function handleLogout() {
    if (itemName === "Sign out") dispatch(logout());
  }

  if (status === "loading") return <Spinner />;

  return (
    <li>
      <Link
        to={route(username)}
        className="flex items-center justify-start gap-4 px-3 py-2 hover:text-orange-coral hover:border hover:border-orange-amber hover:bg-amber-50  rounded-md cursor-pointer"
        onClick={handleLogout}
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
