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

      expect(computation.args.has(timesTwo)).toBe(true);
      expect(computation.args.get(timesTwo)).toEqual([]);
    });

    it("should be chainable", () => {
      computation.add(timesTwo).add(plus, 1, 2, 3);

      expect(computation.args.has(timesTwo)).toBe(true);
      expect(computation.args.get(timesTwo)).toEqual([]);

      expect(computation.args.has(plus)).toBe(true);
      expect(computation.args.get(plus)).toEqual([1, 2, 3]);
    });
  });
});
