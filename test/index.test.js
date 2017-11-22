import TypingMonitor from '../src/index';

import GlobalMonitor from '../src/constructors/global';
import StaticMonitor from '../src/constructors/static';
import ListenerMonitor from '../src/constructors/listener';

describe('TypingMonitor', () => {
  it('exports sub classes', () => {
    expect(new TypingMonitor({ wait: 500 })).toBeInstanceOf(StaticMonitor);

    expect(new TypingMonitor.Static({ wait: 500 })).toBeInstanceOf(StaticMonitor);

    expect(new TypingMonitor.Listener({
      wait: 500,
      input: document.createElement('input'),
    })).toBeInstanceOf(ListenerMonitor);

    expect(new TypingMonitor.Global({ wait: 500 })).toBeInstanceOf(GlobalMonitor);
  });
});
