const ReviewInput = ({
  reviewInput,
  setReviewInput,
  containsSpoilers,
  setContainsSpoilers,
}) => {
  return (
    <div className="border-y border-slate-700 py-4 sm:px-4 px-1">
      <label className="text-sm font-medium text-slate-300 hidden">
        Your Review
      </label>
      <textarea
        value={reviewInput}
        onChange={(e) => setReviewInput(e.target.value)}
        name=""
        id=""
        rows={8}
        placeholder="Write Your Review..."
        className="w-full outline-none shadow-sm resize-none block p-3 bg-slate-800 rounded-lg focus:border-orange-coral transition-colors"
      ></textarea>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="containsSpoilers"
          checked={containsSpoilers}
          onChange={(e) => setContainsSpoilers(e.target.checked)}
          className="w-4 h-4 bg-slate-800 border-slate-500 rounded-lg"
        />
        <label
          htmlFor="containsSpoilers"
          className="ml-2 text-sm text-slate-300"
        >
          Does this Review contain spoilers?
        </label>
      </div>
    </div>
  );
};

export default ReviewInput;
