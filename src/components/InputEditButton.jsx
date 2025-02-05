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
      className={`px-5 py-3 rounded font-medium ${backgroundColor} ${textColor} ${hover}`}
    >
      {children}
    </button>
  );
};

export default InputEditButton;
