const Ellipsis = ({ text, lines = "line-clamp-4" }) => {
  return (
    <span className={`overflow-hidden text-ellipsis max-w-full ${lines}`}>
      {text}
    </span>
  );
};

export default Ellipsis;
