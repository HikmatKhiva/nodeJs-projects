export function monthName(month: number): string {
  return new Date(new Date().getFullYear(), month - 1).toLocaleString("en-US", {
    month: "long",
  });
}
