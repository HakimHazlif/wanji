const InputEditButton = ({
  handleClick,
  isLoading,
  children,
  backgroundColor,
  textColor,
  hover,
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`px-5 md:py-3 sm:py-[10px] py-2 rounded font-medium ${backgroundColor} ${textColor} ${hover}`}
    >
      {children}
    </button>
  );
};

export default InputEditButton;
