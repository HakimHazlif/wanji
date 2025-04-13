import { FaStar } from "react-icons/fa";

const SuspenseRateMini = () => {
  return (
    <div className="rounded-md bg-orange-coral w-[45px] text-gray-700 h-6 flex items-center justify-center gap-1 text-xs font-bold">
      <FaStar className="text-white" />
      <span>0</span>
    </div>
  );
};

export default SuspenseRateMini;
