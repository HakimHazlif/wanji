import { FiFilm } from "react-icons/fi";

const EmptyPoster = ({ size }) => {
  return (
    <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
      <FiFilm size={size} className="text-gray-600" />
    </div>
  );
};

export default EmptyPoster;
