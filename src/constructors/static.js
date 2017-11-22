// @flow

type Listener = (isTyping: boolean) => void;
type Options = {
  wait?: number;
}

class StaticTypingMonitor {
  wait: number;
  timeoutId: number;
  typing: boolean;

  constructor(options: Options = {}) {
    if (typeof options.wait !== 'number') {
      throw new Error('Expected wait interval');
    }
    this.wait = options.wait;
  }

  listen(listener: Listener): void {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function');
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (!this.typing) {
      this.typing = true;
      listener(true);
    }

    this.timeoutId = setTimeout(() => {
      this.typing = false;
      listener(false);
    }, this.wait);
  }
}

export default StaticTypingMonitor;
