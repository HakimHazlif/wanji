export function sumTwoAverages(avg1, avg2, count1, count2) {
  const totalSum = avg1 * count1 + avg2 * count2;
  const totalCount = count1 + count2;

  return totalSum / totalCount;
}

export function sumAverages(avrgs) {
  const totalSum = avrgs.reduce((total, avrg) => {
    const average = Number(avrg?.average) || 0;
    const count = Number(avrg?.count) || 0;
    const sum = average * count;
    return total + sum;
  }, 0);
  const totalCount = avrgs.reduce((total, avrg) => {
    const count = Number(avrg?.count) || 0;
    return total + count;
  }, 0);

  return totalCount > 0 ? totalSum / totalCount : 0;
}
