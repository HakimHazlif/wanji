import { useNavigate } from "react-router";

const CancelButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
