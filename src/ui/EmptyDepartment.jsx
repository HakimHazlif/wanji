const EmptyDepartment = ({ name }) => {
  return (
    <div className="bg-bluish-black flex justify-center items-center rounded-md w-full h-[200px]">
      <p className="text-gray-300 font-medium">
        <span className="text-orange-amber font-bold">{name}</span> has no works
        listed in this department.
      </p>
    </div>
  );
};

export default EmptyDepartment;
