import { useTransition } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const CreateListButton = () => {
  const { transitionNavigate } = useTransitionNavigate();
  const { username } = useSelector((state) => state.user.user);

  return (
    <button
      className="max-w-60 w-72 py-3 bg-orange-amber rounded-full flex justify-center items-center hover:bg-orange-coral transition-colors duration-300"
      onClick={() =>
        transitionNavigate(`/u/${username.replace(" ", "-")}/list/create`)
      }
    >
      <div className="flex items-center gap-3 font-bold text-gray-800">
        <FaPlus />
        <span>Create a new list</span>
      </div>
    </button>
  );
};

export default CreateListButton;
