import { Link } from "react-router-dom";

const ProfileElements = ({ icon, itemName, route, onClose = null }) => {
  return (
    <li>
      <Link
        to={route}
        className="flex items-center justify-start gap-4 px-3 py-1.5 hover:text-amber-500 hover:bg-amber-50 rounded-md cursor-pointer"
        onClick={onClose}
      >
        {icon}
        <span>{itemName}</span>
      </Link>
    </li>
  );
};

export default ProfileElements;
