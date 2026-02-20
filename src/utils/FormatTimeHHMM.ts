export function FormatTimeHHMM(time: string) {
  if (!time) return "-";
  const [hour, minute] = time.split(":");
  return `${hour}:${minute}`;
}
