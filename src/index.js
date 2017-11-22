import StaticMonitor from './constructors/static';
import GlobalMonitor from './constructors/global';
import ListenerMonitor from './constructors/listener';

const TypingMonitor = StaticMonitor;

TypingMonitor.Static = StaticMonitor;
TypingMonitor.Global = GlobalMonitor;
TypingMonitor.Listener = ListenerMonitor;

export default TypingMonitor;
