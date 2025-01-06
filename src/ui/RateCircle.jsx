const RateCircle = ({ rate }) => {
  const ratPercentage = Math.floor(rate * 10);

  return (
    <div className="h-[34px] w-[34px] bg-slate-800 rounded-full flex justify-center items-center relative">
      <div
        className="rounded-full w-[30px] h-[30px] text-white text-[10px] font-semibold flex justify-center items-center"
        style={{
          background: `conic-gradient(#ff7f50 ${
            ratPercentage * 3.6
          }deg, #ffe5b4 ${ratPercentage * 3.6}deg 360deg)`,
        }}
      >
        <div className="bg-slate-800 h-[26px] w-[26px] rounded-full flex justify-center items-center">
          <p>{ratPercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default RateCircle;
