export const IndonesianDateFormat = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    // throw new Error("Format tanggal tidak valid");
    return "Format tanggal tidak valid";
  }

  return parsedDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
