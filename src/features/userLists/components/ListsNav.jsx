import { useSelector } from "react-redux";
import ProfileElements from "../../../components/ProfileElement";
import { BsBookmarkCheck } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdChecklistRtl } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

const ListsNav = ({ onClose }) => {
  const { username } = useSelector((state) => state.user.user);
  const userPath = username.replace(" ", "-");

  return (
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
  );
};

export default ListsNav;
