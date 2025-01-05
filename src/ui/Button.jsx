const Button = ({ children, stylish, setState = null, state = null }) => {
  function handleClick() {
    if (!state) return;
    setState(state);
  }

  return (
    <button className={stylish} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
