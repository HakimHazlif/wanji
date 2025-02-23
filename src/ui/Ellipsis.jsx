const Ellipsis = ({ text, lines = "line-clamp-4" }) => {
  return (
    <span
      className={`overflow-hidden text-ellipsis max-w-full md:text-base text-sm ${lines}`}
    >
      {text}
    </span>
  );
};

export default Ellipsis;
