const ShowStatus = ({ status }) => {
  function getBeautyBackground() {
    switch (status) {
      case "Released":
        return "bg-[#4CAF50]";
      case "Ended":
        return "bg-[#ed8631]";
      case "Returning Series":
        return "bg-[#2196F3]";
      default:
        return "bg-[#90A4AE]";
    }
  }

  return (
    <p
      className={`py-1 px-1.5 text-center rounded-md text-white text-sm font-semibold text-nowrap ${getBeautyBackground()}`}
    >
      {status}
    </p>
  );
};

export default ShowStatus;
