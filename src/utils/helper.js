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

export function getMainCrewRulls(arr) {
  const directing = arr?.filter((item) => item["job"] === "Director");
  const writing = arr?.filter((item) => item["job"] === "Screenplay");
  const production = arr?.filter((item) => item["job"] === "Producer");

  return { directing, writing, production };
}

export function formatHugeNumber(num) {
  const units = [
    { value: 1000000000, symbol: "B" },
    { value: 1000000, symbol: "M" },
    { value: 1000, symbol: "K" },
  ];

  for (const unit of units) {
    if (num >= unit.value) {
      const formatted = (num / unit.value).toFixed(2);
      return formatted.endsWith(".00")
        ? Math.round(num / unit.value) + unit.symbol
        : formatted + unit.symbol;
    }
  }

  return num.toString();
}
