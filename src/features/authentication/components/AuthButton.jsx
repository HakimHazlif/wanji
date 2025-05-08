const AuthButton = ({ children, style, handleClick, isHandling = false }) => {
  return (
    <button
      className={`font-medium font-roboto duration-200 transition-colors py-1.5 px-4 text-sm flex items-center justify-center gap-2 rounded-md ${style}`}
      onClick={handleClick}
      disabled={isHandling}
    >
      {children}
    </button>
  );
};

export default AuthButton;
