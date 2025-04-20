const RadioGroup = ({ value, onChange, onClose, options, header }) => {
  return (
    <div>
      <h4 className="font-bold text-gray-300 pb-1 mb-2 border-b border-slate-700">
        {header}
      </h4>

      <div className="flex flex-col gap-2 pl-3 w-full">
        {options.map((option) => (
          <label key={option.value} className="text-nowrap">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => {
                onClose();
                onChange(e);
              }}
            />{" "}
            <span className="text-nowrap">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
