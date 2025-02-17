const EmptyShortList = ({ listNmae, children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center mt-5">
      <div className="text-center">
        <p className="text-xl font-medium mb-5">No {listNmae} yet</p>
        {children}
      </div>
    </div>
  );
};

export default EmptyShortList;
