const SuspenseList = () => {
  return (
    <div className="padding-x md:pt-32 pt-52">
      <div className="flex items-center justify-between mb-6">
        <div className="bg-slate-700 suspense w-60 h-7 rounded-lg"></div>
        <div className="flex gap-3">
          <div className="sm:h-8 sm:w-8 h-5 w-5 rounded-full bg-slate-600 suspense"></div>
          <div className="sm:h-8 sm:w-8 h-5 w-5 rounded-full bg-slate-600 suspense"></div>
        </div>
      </div>
      <div className="overflow-hidden flex gap-5">
        {[...Array(5)].map((el, i) => (
          <SuspenseCard key={i} />
        ))}
      </div>
    </div>
  );
};

const SuspenseCard = () => {
  return (
    <div className="md:w-52 sm:w-48 w-44">
      <div className="md:w-52 sm:w-48 w-44 md:h-[320px] sm:h-[290px] h-[260px] rounded-md shadow-2xl bg-slate-600 suspense"></div>
      <div className="mt-2">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2">
            <div className="rounded-md bg-slate-600 suspense w-[45px] h-5"></div>
            <div className="rounded-md bg-slate-600 suspense w-[45px] h-5"></div>
          </div>
          <div className="w-7 h-4 rounded-md bg-slate-600 suspense"></div>
        </div>
      </div>
      <div className="w-40 h-4 rounded-md bg-slate-600 suspense mt-2"></div>
      <div className="flex justify-between gap-2 mt-4">
        <div className="w-1/2 h-9 rounded-md bg-slate-600 suspense"></div>
        <div className="w-1/2 h-9 rounded-md bg-slate-600 suspense"></div>
      </div>
    </div>
  );
};

export default SuspenseList;
