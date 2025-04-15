const MediaSectionHeader = ({ title, description }) => {
  return (
    <div className="border-b border-slate-700 pb-5">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-5 text-base text-slate-400">{description}</p>
    </div>
  );
};

export default MediaSectionHeader;
