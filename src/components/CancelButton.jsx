import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const CancelButton = () => {
  const { transitionNavigate } = useTransitionNavigate();

  return (
    <button
      type="button"
      onClick={() => transitionNavigate(-1)}
      className="px-6 md:py-3 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 md:text-base text-sm"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
