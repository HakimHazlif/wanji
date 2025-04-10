import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const CancelButton = () => {
  const { transitionNavigate, isPending } = useTransitionNavigate();

  return (
    <button
      type="button"
      onClick={() => transitionNavigate(-1)}
      className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
