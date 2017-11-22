import StaticMonitor from '../../src/constructors/static';

jest.useFakeTimers();

describe('StaticMonitor', () => {
  it('works', () => {
    const typingMonitor = new StaticMonitor({ wait: 1000 });
    expect(typingMonitor).toBeInstanceOf(StaticMonitor);
  });

  it('runs callback once after a wait period', () => {
    const TIMES_CALLED = 10;
    const WAIT = 500;

    const typingMonitor = new StaticMonitor({ wait: WAIT });

    const callback = jest.fn();

    for (let i = 0; i < TIMES_CALLED; i++) { // eslint-disable-line
      typingMonitor.listen(callback);
    }

    expect(callback).toHaveBeenLastCalledWith(true);

    jest.runAllTimers();

    expect(callback).toHaveBeenLastCalledWith(false);
    expect(callback).toHaveBeenCalledTimes(2);

    expect(setTimeout.mock.calls[0][1]).toBe(WAIT);
    expect(setTimeout.mock.calls).toHaveLength(TIMES_CALLED);
  });

  it('throws on invalid options', () => {
    const calls = [
      () => new StaticMonitor(),
      () => new StaticMonitor({}),
      () => new StaticMonitor({ wait: 'string' }),
    ];
    calls.forEach(call => expect(call).toThrow());
  });

  it('throws on invalid listener', () => {
    const monitor = new StaticMonitor({ wait: 500 });
    expect(() => {
      monitor.listen('not a function');
    }).toThrow();
  });
});
