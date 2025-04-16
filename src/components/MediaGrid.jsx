const MediaGrid = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-center items-center w-full gap-10 gap-y-14 pt-20">
      {children}
    </div>
  );
};

export default MediaGrid;
