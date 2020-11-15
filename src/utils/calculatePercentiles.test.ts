import calculatePercentiles from "./calculatePercentiles";

describe("calculatePercentiles", () => {
  describe("For a number array", () => {
    const values = [15, 12, 12, 1, 3, 5, 6, 7];

    describe("given empty percentile point", () => {
      it("should return an empty object", () => {
        const percentiles = calculatePercentiles(values, []);
        expect(percentiles).toEqual({});
      });
    });

    describe("given non-empty percentile point", () => {
      it("should return an object with percentile points as keys", () => {
        const percentiles = calculatePercentiles(values, [25, 50, 75]);
        expect(percentiles).toEqual({ 25: 4, 50: 6.5, 75: 12 });
      });
    });

    describe("given percentile point > 100", () => {
      it("should return an object with percentile points as keys", () => {
        const percentiles = calculatePercentiles(values, [25, 50, 175]);
        expect(percentiles).toEqual({ 25: 4, 50: 6.5, 175: 15 });
      });
    });
  });

  describe("For an empty array", () => {
    const values: number[] = [];

    describe("given empty percentile point", () => {
      it("should return an empty object", () => {
        const percentiles = calculatePercentiles(values, []);
        expect(percentiles).toEqual({});
      });
    });

    describe("given non-empty percentile point", () => {
      it("should return an object with percentile points as keys", () => {
        const percentiles = calculatePercentiles(values, [25, 50, 75]);
        expect(percentiles).toEqual({ 25: 0, 50: 0, 75: 0 });
      });
    });
  });
});
