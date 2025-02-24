const SetTodayButton = ({ setToday }) => {
  return (
    <button
      onClick={setToday}
      className="flex items-center gap-2 px-4 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200 font-medium text-sm"
    >
      Set to Today
    </button>
  );
};

export default SetTodayButton;
