export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 100000) {
    const thousands = num / 1000;
    return thousands % 1 === 0
      ? `${thousands}K`
      : `${thousands.toFixed(1)}K`;
  }

  if (num < 10000000) {
    const lakhs = num / 100000;
    return lakhs % 1 === 0
      ? `${lakhs}L`
      : `${lakhs.toFixed(2)}L`;
  }
  if (num == 15000000) {
    const crores = num / 10000000;
    return crores % 1 === 0
      ? `${crores}Cr`
      : `${crores.toFixed(1)}Cr`;
  }

  const crores = num / 10000000;
  return crores % 1 === 0
    ? `${crores}Cr`
    : `${crores.toFixed(2)}Cr`;



}

