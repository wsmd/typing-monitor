// @flow

import StaticMonitor from './static';
import isInput from '../utils/isInput';

type Listener = (isTyping?: boolean) => void;

type InputElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | window;

type Options = {
  wait: number,
  input: InputElement,
}

class ListenerTypingMonitor {
  wait: number;
  input: InputElement;
  monitor: StaticMonitor;
  listeners: Array<Listener>;

  constructor(options: Options) {
    const hasOptions = typeof options !== 'undefined';
    if (hasOptions && typeof options.wait !== 'number') {
      throw new Error('Expected options.wait to be a number');
    }
    if (hasOptions && (!isInput(options.input) && options.input !== window)) {
      throw new Error('Expected options.input to be an element');
    }
    this.wait = options.wait;
    this.input = options.input;
    this.listeners = [];
    this.monitor = new StaticMonitor({ wait: options.wait });
    (this: any).handleInput = this.handleInput.bind(this);
  }

  handleInput() {
    this.monitor.listen((isTyping) => {
      this.listeners.forEach(listener => listener(isTyping));
    });
  }

  unsubscribe(listener: Listener) {
    const index = this.listeners.indexOf(listener);
    /* istanbul ignore else */
    if (index >= 0) {
      this.listeners.splice(index, 1);
      if (this.listeners.length === 0) {
        this.input.removeEventListener('input', this.handleInput, true);
      }
    }
  }

  listen(listener: Listener): () => void {
    if (this.listeners.length === 0) {
      this.input.addEventListener('input', this.handleInput, true);
    }
    this.listeners.push(listener);
    return this.unsubscribe.bind(this, listener);
  }
}

export default ListenerTypingMonitor;
