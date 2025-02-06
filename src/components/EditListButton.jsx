import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const EditListButton = ({ listId }) => {
  const navigate = useNavigate();
  // const { username } = useSelector((state) => state.user.user);
  return (
    <button
      className="flex gap-2 items-center justify-center font-medium w-[130px] h-[35px] bg-orange-coral rounded-full"
      onClick={() => navigate(`edit?listId=${listId}`)}
    >
      <FaPencil />
      Edit List
    </button>
  );
};

export default EditListButton;
