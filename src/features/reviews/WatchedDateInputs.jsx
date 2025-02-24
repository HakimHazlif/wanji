import { IoClose } from "react-icons/io5";
import SetTodayButton from "../../components/SetTodayButton";

const WatchedDateInputs = ({
  startedValue,
  finishedValue,
  handleChange,
  setToday,
  removeDate = null,
  type,
  index = null,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-6">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium text-slate-300 text-nowrap max-sm:hidden">
            {type === "tv" ? "Date Started:" : "Date Watched:"}
          </label>
          <input
            type="date"
            value={startedValue}
            onChange={(e) => handleChange(e, "startedDate", index)}
            className="px-2 py-1 text-sm bg-slate-800 border border-slate-500 rounded-lg focuse:border-orange-colar outline-none transition-colors"
          />
          <SetTodayButton setToday={() => setToday("startedDate", index)} />
        </div>
        {type === "tv" && (
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium text-slate-300 text-nowrap">
              Date Finished:
            </label>
            <input
              type="date"
              value={finishedValue}
              onChange={(e) => handleChange(e, "finishedDate", index)}
              className="text-sm bg-slate-800 border border-slate-500 rounded-lg focuse:border-orange-colar outline-none transition-colors"
            />
            <SetTodayButton setToday={() => setToday("finishedDate", index)} />
          </div>
        )}
      </div>
      {index !== null && (
        <button
          className="text-slate-500 hover::text-slate-100 transition-colors duration-150"
          onClick={() => removeDate(index)}
        >
          <IoClose size={25} />
        </button>
      )}
    </div>
  );
};

export default WatchedDateInputs;
