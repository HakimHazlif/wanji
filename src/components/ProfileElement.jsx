import Spinner from "../ui/Spinner";

import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProfileElements = ({ icon, itemName, route, onClose = null }) => {
  const { status } = useSelector((state) => state.user);

  if (status === "loading") return <Spinner />;

  return (
    <li>
      <Link
        to={route}
        className="flex items-center justify-start gap-4 px-3 py-1.5 hover:text-orange-coral hover:border hover:border-orange-amber hover:bg-amber-50  rounded-md cursor-pointer"
        onClick={onClose}
      >
        {icon}
        <span>{itemName}</span>
      </Link>
    </li>
  );
};

export default ProfileElements;
