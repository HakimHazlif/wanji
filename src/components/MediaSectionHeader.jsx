import MediaFilterTabs from "./MediaFilterTabs";

const MediaSectionHeader = ({ title, description, typeTag = "" }) => {
  return (
    <div className="border-b border-slate-700 pb-5 w-full flex items-end justify-between gap-10">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-5 text-base text-slate-400">{description}</p>
      </div>
      {typeTag && <MediaFilterTabs typeTag={typeTag} />}
    </div>
  );
};

export default MediaSectionHeader;
