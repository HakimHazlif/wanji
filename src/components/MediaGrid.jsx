const MediaGrid = ({ children }) => {
  return (
    <div className="w-full justify-items-center grid xl:grid-cols-4 2xl:grid-cols-5 md:grid-cols-4  sm:grid-cols-3  xs:grid-cols-2 gap-16 pt-20">
      {children}
    </div>
  );
};

export default MediaGrid;
