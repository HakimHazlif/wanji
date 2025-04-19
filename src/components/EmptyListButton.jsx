const EmptyListButton = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="px-10 py-[10px] bg-orange-amber rounded-full flex justify-center items-center hover:bg-orange-coral transition-colors duration-300 text-gray-900 font-medium"
    >
      {children}
    </button>
  );
};

export default EmptyListButton;
