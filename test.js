let expect = require("expect");
let Lazy = require("./");

describe("Lazy", () => {
  let computation;

  function timesTwo(a) {
    return a * 2;
  }

  function plus(a, b) {
    return a + b;
  }

  beforeEach(() => {
    computation = new Lazy();
  });

  describe("Add method", () => {
    it("should save the fn and the arguments as k-v pairs", () => {
      computation.add(timesTwo);

      expect(computation.dataMap.has(timesTwo)).toBe(true);
      expect(computation.dataMap.get(timesTwo)).toEqual([]);
    });

    it("should be chainable", () => {
      computation.add(timesTwo).add(plus, 1, 2, 3);

      expect(computation.dataMap.has(timesTwo)).toBe(true);
      expect(computation.dataMap.get(timesTwo)).toEqual([]);

      expect(computation.dataMap.has(plus)).toBe(true);
      expect(computation.dataMap.get(plus)).toEqual([1, 2, 3]);
    });
  });

  describe("Evaluate method", () => {
    it("should return a result array (one function)", () => {
      const expected = [4];
      const result = computation.add(timesTwo).evaluate([2]);

      expect(result).toEqual(expected);
    });

    it("should return a result array (multiple functions)", () => {
      const expected = [3, 5, 7];
      const result = computation
        .add(timesTwo)
        .add(plus, 1)
        .evaluate([1, 2, 3]);

      expect(result).toEqual(expected);
    });
  });
});
