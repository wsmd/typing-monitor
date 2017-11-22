/* eslint-disable no-console */

import GlobalTypingMonitor from '../../src/constructors/global';
import simulateInputChange from '../helpers/simulateInputChange';

jest.useFakeTimers();

beforeEach(() => {
  document.body.innerHTML = `
    <input id="input1" type="text" />
    <input id="input2" type="text" />
  `;
});

describe('GlobalTypingMonitor', () => {
  it('works', () => {
    const callback = jest.fn();
    const input1 = document.querySelector('input#input1');
    const input2 = document.querySelector('input#input2');
    const monitor = new GlobalTypingMonitor({ wait: 500 });

    // TODO: test unsubscribe
    monitor.listen(callback);

    simulateInputChange(input1);
    simulateInputChange(input2);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith(false);
  });

  it('works as a singleton', () => {
    const preSpy = console.error;
    const spy = jest.fn();
    console.error = spy;

    const monitor1 = new GlobalTypingMonitor({ wait: 1000 });

    expect(spy.mock.calls[0][0]).toMatch(/You are creating a new instance of GlobalTypingMonitor.+500ms/);

    const monitor2 = new GlobalTypingMonitor({ wait: 2000 });

    expect(monitor1).toBe(monitor2);
    expect(monitor1).toBe(monitor2);

    console.error = preSpy;
  });
});
