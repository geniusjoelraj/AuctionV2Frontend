export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 100000) {
    // Thousands (K)
    const thousands = num / 1000;
    return thousands % 1 === 0
      ? `${thousands}K`
      : `${thousands.toFixed(1)}K`;
  }

  if (num < 10000000) {
    // Lakhs (L)
    const lakhs = num / 100000;
    return lakhs % 1 === 0
      ? `${lakhs}L`
      : `${lakhs.toFixed(2)}L`;
  }

  // Crores (Cr)
  const crores = num / 10000000;
  return crores % 1 === 0
    ? `${crores}Cr`
    : `${crores.toFixed(2)}Cr`;
}

