import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CreateListButton = () => {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user.user);

  return (
    <button
      className="w-60 py-3 bg-orange-amber rounded-full flex justify-center items-center hover:bg-orange-coral transition-colors duration-300"
      onClick={() => navigate(`/u/${username}/list/create`)}
    >
      <div className="flex items-center gap-3 font-bold text-gray-900">
        <FaPlus />
        <span>Create a new list</span>
      </div>
    </button>
  );
};

export default CreateListButton;
