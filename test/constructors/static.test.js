import StaticTypingMonitor from '../../src/constructors/static';

jest.useFakeTimers();

describe('StaticTypingMonitor', () => {
  it('runs callback once after a wait period', () => {
    const WAIT = 500;
    const callback = jest.fn();
    const typingMonitor = new StaticTypingMonitor({ wait: WAIT });

    typingMonitor.listen(callback);
    jest.runTimersToTime(WAIT - 1);
    typingMonitor.listen(callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith(true);
    callback.mockReset();

    jest.runAllTimers();

    expect(callback).toHaveBeenLastCalledWith(false);

    expect(setTimeout.mock.calls[0][1]).toBe(WAIT);
    expect(setTimeout.mock.calls).toHaveLength(2);
  });

  it('throws on invalid options', () => {
    const calls = [
      () => new StaticTypingMonitor(),
      () => new StaticTypingMonitor({}),
      () => new StaticTypingMonitor({ wait: 'string' }),
    ];
    calls.forEach(call => expect(call).toThrow());
  });

  it('throws on invalid listener', () => {
    const monitor = new StaticTypingMonitor({ wait: 500 });
    expect(() => {
      monitor.listen('not a function');
    }).toThrow();
  });
});
