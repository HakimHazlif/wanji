import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const List = ({ title, children }) => {
  return (
    <section className="padding-x">
      <div className=" flex items-center justify-between">
        <h2 className="font-bold text-3xl">{title}</h2>
        <div className="flex gap-3 text-3xl text-slate-600">
          <IoIosArrowDropleftCircle />
          <IoIosArrowDroprightCircle />
        </div>
      </div>
      {children}
    </section>
  );
};

export default List;
