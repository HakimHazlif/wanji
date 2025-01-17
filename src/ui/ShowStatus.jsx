const ShowStatus = ({ status }) => {
  function getBeautyBackground() {
    switch (status) {
      case "Released":
        return "bg-[#4CAF50]";
      case "Ended":
        return "bg-[#B0BEC5]";
      case "Returning serie":
        return "bg-[#2196F3]";
      default:
        return "bg-[#90A4AE]";
    }
  }

  return (
    <p className={`py-1 px-3 rounded-md ${getBeautyBackground()}`}>{status}</p>
  );
};

export default ShowStatus;
