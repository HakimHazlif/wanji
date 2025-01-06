export function getImageViaPath(path, width) {
  return `https://image.tmdb.org/t/p/w${width}${path}`;
}

export function updateDateFormat(date) {
  const newDate = new Date(date);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = newDate.toLocaleDateString(undefined, options);

  return formattedDate;
}

export function getYearMonthFormat(date) {
  const newDate = new Date(date);

  const options = {
    year: "numeric",
    month: "short",
  };

  const formattedDate = newDate.toLocaleDateString(undefined, options);

  return formattedDate;
}

export function ratePercentage(rate) {
  const rateNum = Math.round(Number(rate) * 10);
  return rateNum;
}

export function formatNumber(num) {
  return num % 1 !== 0 ? num.toFixed(1) : num;
}

export function getPictureUrlFormat(paramId, width) {
  return `https://image.tmdb.org/t/p/w${width}${paramId}`;
}
