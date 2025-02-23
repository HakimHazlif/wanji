const Detail = ({ children, detail }) => {
  return (
    <div className="flex">
      <span className="w-40 text-slate-300 text-nowrap">{detail}</span>
      {children}
    </div>
  );
};

export default Detail;
