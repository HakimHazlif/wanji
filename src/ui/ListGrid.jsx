import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

const ListGrid = ({ path, title, children }) => {
  return (
    <div className="">
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
      <div className="">
        <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 justify-items-center w-full xs:gap-y-20 gap-10 gap-y-10 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ListGrid;
