import ListenerTypingMonitor from '../../src/constructors/listener';

const INPUT_EVENT = new Event('input');
export function simulateInputChange(element) {
  element.dispatchEvent(INPUT_EVENT);
}

jest.useFakeTimers();

describe('ListenerTypingMonitor', () => {
  it('listens to an element change', () => {
    const element = document.createElement('input');
    const callback = jest.fn();

    const monitor = new ListenerTypingMonitor({
      wait: 1000,
      input: element,
    });

    monitor.listen(callback);

    simulateInputChange(element);
    simulateInputChange(element);

    expect(callback).toHaveBeenCalledWith(true);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith(false);

    expect(() => {
      new ListenerTypingMonitor(); // eslint-disable-line
    }).toThrow();
  });

  it('listens to an element change', () => {
    const element = document.createElement('input');
    const callback = jest.fn();

    const monitor = new ListenerTypingMonitor({
      wait: 1000,
      input: element,
    });

    const unsubscribe = monitor.listen(callback);
    unsubscribe();

    simulateInputChange(element);
    expect(callback).not.toHaveBeenCalled();
  });

  it('creates multiple listeners', () => {
    const element = document.createElement('input');
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const monitor = new ListenerTypingMonitor({
      wait: 1000,
      input: element,
    });

    const unsubscribe1 = monitor.listen(callback1);
    const unsubscribe2 = monitor.listen(callback2); // eslint-disable-line

    simulateInputChange(element);

    expect(callback1).toHaveBeenCalledWith(true);
    expect(callback2).toHaveBeenCalledWith(true);

    jest.runAllTimers();

    expect(callback1).toHaveBeenCalledWith(false);
    expect(callback2).toHaveBeenCalledWith(false);

    unsubscribe1();

    simulateInputChange(element);

    jest.runAllTimers();

    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledTimes(4);
  });

  it('throws on invalid options', () => {
    const calls = [
      () => new ListenerTypingMonitor(),
      () => new ListenerTypingMonitor({}),
      () => new ListenerTypingMonitor({ wait: 1000 }), // missing input
    ];
    calls.forEach(call => expect(call).toThrow());
  });
});
