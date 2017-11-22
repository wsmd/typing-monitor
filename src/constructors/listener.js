// @flow
import StaticMonitor from './static';
import Stack from '../utils/stack';
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
  listeners: Stack;

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
    this.listeners = new Stack();
    this.monitor = new StaticMonitor({ wait: options.wait });
    (this: any).handleInput = this.handleInput.bind(this);
    this.addEventListener();
  }

  addEventListener() {
    this.input.addEventListener('input', this.handleInput, true);
  }

  removeEventListener() {
    this.input.addEventListener('input', this.handleInput, true);
  }

  handleInput() {
    this.monitor.listen((isTyping) => {
      this.listeners.each(listener => listener(isTyping));
    });
  }

  unsubscribe(listener: Listener) {
    this.listeners.remove(listener);
    if (this.listeners.length === 0) {
      this.removeEventListener();
    }
  }

  listen(listener: Listener): () => void {
    this.listeners.add(listener);
    return this.unsubscribe.bind(this, listener);
  }
}

export default ListenerTypingMonitor;
