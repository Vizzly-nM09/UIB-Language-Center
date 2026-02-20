export const IndonesianDateTimeFormat = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Format tanggal tidak valid");
  }

  return parsedDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
