// @flow

class Stack {
  stack: Array<any>;

  constructor() {
    this.stack = [];
  }

  add(item: any): void {
    this.stack = this.stack.concat(item);
  }

  remove(item: any): void {
    const index = this.stack.indexOf(item);
    /* istanbul ignore else */
    if (index >= 0) {
      this.stack = this.stack
        .slice(0, index)
        .concat(this.stack.slice(index + 1));
    }
  }

  each(cb: any => void): void {
    let index = 0;
    while (index < this.length) {
      cb(this.stack[index]);
      index++; // eslint-disable-line
    }
  }

  get length(): number {
    return this.stack.length;
  }
}

export default Stack;
