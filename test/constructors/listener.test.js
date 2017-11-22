import ListenerTypingMonitor from '../../src/constructors/listener';
import simulateInputChange from '../helpers/simulateInputChange';

jest.useFakeTimers();

describe('ListenerTypingMonitor', () => {
  it('listens to an input change', () => {
    const WAIT = 1000;
    const spy = jest.fn();
    const input = document.createElement('input');
    const monitor = new ListenerTypingMonitor({ wait: WAIT, input });

    monitor.listen(spy);

    simulateInputChange(input);
    jest.runTimersToTime(WAIT - 1);
    simulateInputChange(input);

    expect(spy).toHaveBeenCalledWith(true);
    expect(spy).toHaveBeenCalledTimes(1);

    jest.runTimersToTime(WAIT);

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('unsubscribes listeners and re-listens', () => {
    const input = document.createElement('input');
    const monitor = new ListenerTypingMonitor({ wait: 1000, input });
    const spy = jest.fn();
    const unsubscribe = monitor.listen(spy);

    unsubscribe();
    simulateInputChange(input);
    expect(spy).not.toHaveBeenCalled();

    jest.runAllTimers();

    monitor.listen(spy);
    simulateInputChange(input);
    expect(spy).toHaveBeenCalled();
  });

  it('creates and unsubscribes multiple listeners', () => {
    const input = document.createElement('input');
    const monitor = new ListenerTypingMonitor({ wait: 1000, input });
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spies = [spy1, spy2];

    const unsubscribe1 = monitor.listen(spy1);
    const unsubscribe2 = monitor.listen(spy2); // eslint-disable-line

    simulateInputChange(input);
    spies.forEach(spy => expect(spy).toHaveBeenCalledWith(true));
    jest.runAllTimers();
    spies.forEach(spy => expect(spy).toHaveBeenCalledWith(false));

    spies.forEach(spy => spy.mockClear());
    unsubscribe1();

    simulateInputChange(input);
    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
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
