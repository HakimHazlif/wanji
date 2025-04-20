import { IoMdArrowDropdown } from "react-icons/io";

/*
options = [{
  label: 
  value: 
}]
*/
const Selector = ({ value, onChange, options }) => {
  return (
    <div className="relative flex justify-center items-center">
      <select
        value={value}
        onChange={onChange}
        className="bg-bluish-black outline-none shadow-none text-white rounded-full py-[10px] px-4 pr-8 appearance-none lg:text-base md:text-sm text-xs"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <IoMdArrowDropdown />
      </div>
    </div>
  );
};

export default Selector;
