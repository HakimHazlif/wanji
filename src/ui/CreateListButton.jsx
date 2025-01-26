import { FaPlus } from "react-icons/fa";

const CreateListButton = () => {
  return (
    <button className="w-60 py-3 bg-orange-amber rounded-full flex justify-center items-center hover:bg-orange-coral transition-colors duration-300">
      <div className="flex items-center gap-3 font-bold text-gray-900">
        <FaPlus />
        <span>Create a new list</span>
      </div>
    </button>
  );
};

export default CreateListButton;
