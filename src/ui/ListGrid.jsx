import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const ListGrid = ({ path, title, children }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <h2 className="heading-title-1 flex items-end gap-4 group ">{title}</h2>
        {path && (
          <Link
            to={path}
            className="flex items-center gap-1 text-gray-300  md:text-xl sm:text-lg text-base hover:text-orange-coral"
          >
            <span>View all</span>
            <IoIosArrowForward className="md:text-3xl sm:text-2xl text-xl" />
          </Link>
        )}
      </div>
      <div className="flex flex-wrap justify-center w-full gap-10 gap-y-10 pb-8 ">
        {children}
      </div>
    </div>
  );
};

export default ListGrid;
