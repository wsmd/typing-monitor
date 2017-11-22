// @flow

import ListenerMonitor from './listener';
import warning from '../utils/warning';

let instance: GlobalTypingMonitor; // eslint-disable-line

type Options = {
  wait: number,
}

type Listener = (isTyping?: boolean) => void;

class GlobalTypingMonitor {
  wait: number;
  monitor: any;

  constructor(options: Options) {
    if (!instance) {
      this.wait = options.wait;
      this.monitor = new ListenerMonitor({
        wait: this.wait,
        input: window,
      });
      instance = this;
    } else {
      warning('You are creating a new instance of GlobalTypingMonitor. Another ' +
        'instance has been previously created with a waiting period of ' +
        `${instance.wait}ms. The original instance will be used instead.`);
    }
    return instance;
  }

  listen(listener: Listener): () => void {
    return this.monitor.listen(listener);
  }
}

export default GlobalTypingMonitor;
