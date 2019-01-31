module.exports = class Lazy {
  constructor() {
    this.dataMap = new Map();
  }

  add(fn, ...args) {
    this.dataMap.set(fn, [...args]);
    return this;
  }

  evaluate(target) {
    return target.map(val => {
      let result;

      for (let [fn, args] of this.dataMap) {
        result = !result
          ? fn.apply(this, [...args, val])
          : fn.apply(this, [...args, result]);
      }

      return result;
    });
  }
};
