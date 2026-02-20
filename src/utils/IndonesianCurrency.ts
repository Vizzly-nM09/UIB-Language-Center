export const IndonesianCurrency = (
  angka: number,
  withSymbol: boolean = true
): string => {
  return angka
    .toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
    .replace(/^Rp /, withSymbol ? "Rp " : "");
};
