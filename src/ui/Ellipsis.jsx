const Ellipsis = ({ text, lines = "line-clamp-4" }) => {
  return (
    <div className="">
      <p
        className={`font-semibold overflow-hidden text-ellipsis max-w-full ${lines}`}
      >
        {text}
      </p>
    </div>
  );
};

export default Ellipsis;
