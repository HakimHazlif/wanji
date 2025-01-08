const IconicButton = ({ children, handleOnClick }) => {
  return <button onClick={handleOnClick}>{children}</button>;
};

export default IconicButton;
