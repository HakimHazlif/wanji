import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

const ListGrid = ({ path, title, children }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-semibold flex items-end gap-4 group text-white">
          {title}
        </h2>
        {path && (
          <Link
            to={path}
            className="flex items-center gap-1 text-gray-300 text-xl hover:text-orange-coral"
          >
            <span>View all</span>
            <IoIosArrowForward size={30} />
          </Link>
        )}
      </div>
      <div className="">
        <div className="grid justify-items-center w-full gap-y-20 gap-10 grid-cols-4 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ListGrid;
