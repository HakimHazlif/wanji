import { FiFilm } from "react-icons/fi";

const EmptyPoster = ({
  size = 100,
  style = "w-full md:h-[322px] sm:h-[292px] h-[260px] rounded-lg",
}) => {
  return (
    <div
      className={`${style} aspect-[2/3] bg-gray-900 flex items-center justify-center`}
    >
      <FiFilm size={size} className="text-gray-600" />
    </div>
  );
};

export default EmptyPoster;
