/* eslint-disable no-console */

import warning from '../../src/utils/warning';

describe('utils/warning', () => {
  it('works', () => {
    const MESSAGE = 'message';
    const preSpy = console.error;
    const spy = jest.fn();
    console.error = spy;
    try {
      warning(MESSAGE);
      expect(spy).toBeCalledWith(MESSAGE);
    } finally {
      console.error = preSpy;
    }
  });

  it('does not throw when console is not available', () => {
    const realConsole = console;
    Object.defineProperty(global, 'console', { value: undefined });
    try {
      expect(() => warning('please do not throw')).not.toThrow();
    } finally {
      Object.defineProperty(global, 'console', { value: realConsole });
    }
  });

  it('does not throw when console.error is not available', () => {
    const realConsole = console;
    Object.defineProperty(global, 'console', { value: {} });
    try {
      expect(() => warning('please do not throw')).not.toThrow();
    } finally {
      Object.defineProperty(global, 'console', { value: realConsole });
    }
  });
});
