const ItemsListOption = ({ handleOption, icon, option }) => {
  return (
    <li
      onClick={handleOption}
      className="w-full py-2 px-5 flex items-center gap-2 text-base hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
    >
      {icon}
      <span>{option}</span>
    </li>
  );
};

export default ItemsListOption;
