const Ellipsis = ({ text }) => {
  return (
    <div className="h-14 mt-6 mb-8">
      <p className="font-semibold text-slate-100  overflow-hidden text-ellipsis max-w-full space-y-4 line-clamp-4">
        {text}
      </p>
    </div>
  );
};

export default Ellipsis;
