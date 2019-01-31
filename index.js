module.exports = class Lazy {
  constructor() {
    this.args = new Map();
  }

  add(fn, ...args) {
    this.args.set(fn, [...args]);
    return this;
  }
};
