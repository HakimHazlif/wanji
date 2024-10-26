export function getBackdrop(path) {
  return `https://image.tmdb.org/t/p/w1280${path}`;
}

export function updateDateFormat(date) {
  const newDate = new Date(date)

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const formattedDate = newDate.toLocaleDateString(undefined, options)

  return formattedDate
}


export function ratePercentage(rate) {
  const rateNum = Math.round(Number(rate) * 10);
  return rateNum
}