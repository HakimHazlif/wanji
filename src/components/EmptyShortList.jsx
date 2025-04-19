const EmptyShortList = ({ listName, children }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-5">
      <p className="text-xl text-center font-medium mb-5">No {listName} yet</p>
      {children}
    </div>
  );
};

export default EmptyShortList;
