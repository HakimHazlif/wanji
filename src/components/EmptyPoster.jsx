import { FiFilm } from "react-icons/fi";

const EmptyPoster = ({ size = 100 }) => {
  return (
    <div className="w-full md:h-[322px] sm:h-[292px] h-[260px] aspect-[2/3] bg-gray-900 rounded-lg flex items-center justify-center">
      <FiFilm size={size} className="text-gray-600" />
    </div>
  );
};

export default EmptyPoster;
