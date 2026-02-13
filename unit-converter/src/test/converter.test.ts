import { describe, it, expect } from "vitest";
import { converter } from "../utils/converter.js";

describe("Unit converter", () => {
  describe("weight", () => {
    it("convert kg to lb", () => {
      expect(converter(1, "kg", "lb")).toBeCloseTo(2.20462, 5);
    });
    it("convert lb to kg", () => {
      expect(converter(2.20462, "lb", "kg")).toBeCloseTo(1, 5);
    });
  });

  describe("Temperature", () => {
    it("converts C to F", () => {
      expect(converter(0, "C", "F")).toBe(32);
    });

    it("converts F to C", () => {
      expect(converter(32, "F", "C")).toBe(0);
    });
  });

  describe("Length", () => {
    it("converts m to ft", () => {
      expect(converter(1, "m", "ft")).toBeCloseTo(3.28084, 5);
    });

    it("returns same value if units match", () => {
      expect(converter(10, "kg", "kg")).toBe(10);
    });
  });
});
