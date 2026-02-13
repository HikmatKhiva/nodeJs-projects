export function converter(value: number, from: string, to: string) {
  if (from === "kg" && to === "lb") return value * 2.20462;
  if (from === "lb" && to === "kg") return value / 2.20462;

  if (from === "C" && to === "F") return (value * 9) / 5 + 32;
  if (from === "F" && to === "C") return ((value - 32) * 5) / 9;

  if (from === "m" && to === "ft") return value * 3.28084;
  if (from === "ft" && to === "m") return value / 3.28084;
  return value;
}