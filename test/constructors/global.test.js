/* eslint-disable no-console */

import GlobalTypingMonitor from '../../src/constructors/global';
import simulateInputChange from '../helpers/simulateInputChange';
import '../helpers/spyConsoleError';

jest.useFakeTimers();

beforeAll(() => {
  document.body.innerHTML = `
    <input type="text" />
    <textarea></textarea>
  `;
});

describe('GlobalTypingMonitor', () => {
  const INITIAL_WAIT = 500;

  it('listens to one or more elements on the page', () => {
    const spy = jest.fn();
    const input = document.querySelector('input');
    const textarea = document.querySelector('textarea');
    const monitor = new GlobalTypingMonitor({ wait: INITIAL_WAIT });
    const unsubscribe = monitor.listen(spy);

    simulateInputChange(input);
    jest.runTimersToTime(INITIAL_WAIT - 1); // pause then type again
    simulateInputChange(textarea);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(true);

    jest.runTimersToTime(INITIAL_WAIT);
    expect(spy).toHaveBeenLastCalledWith(false);

    simulateInputChange(textarea);
    expect(spy).toHaveBeenLastCalledWith(true);

    jest.runTimersToTime(INITIAL_WAIT);
    expect(spy).toHaveBeenLastCalledWith(false);

    unsubscribe();
  });

  it('unsubscribes listeners', () => {
    const spy = jest.fn();
    const input = document.querySelector('input');
    const monitor = new GlobalTypingMonitor({ wait: 500 });
    const unsubscribe = monitor.listen(spy);

    unsubscribe();
    simulateInputChange(input);
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * this test assumes that we've created two instances from the tests above
   */
  it('warns about creating multiple instances', () => {
    // eslint-disable-next-line
    const monitor = new GlobalTypingMonitor({ wait: 1000 });
    const errorMessage = new RegExp(
      'Another instance has been previously created with a waiting period of ' +
      `${INITIAL_WAIT}ms`
    );
    expect(console.error.mock.calls[1][0]).toMatch(errorMessage);
  });

  it('returns a singleton', () => {
    const monitor1 = new GlobalTypingMonitor({ wait: 1000 });
    const monitor2 = new GlobalTypingMonitor({ wait: 1000 });
    expect(monitor1).toBe(monitor2);
  });
});
