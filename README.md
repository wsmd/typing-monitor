[![Build Status](https://travis-ci.org/wsmd/typing-monitor.svg?branch=master)](https://travis-ci.org/wsmd/typing-monitor)
[![Coverage Status](https://coveralls.io/repos/github/wsmd/typing-monitor/badge.svg?branch=master)](https://coveralls.io/github/wsmd/typing-monitor?branch=master)
![](https://img.shields.io/badge/module-umd%2C%20cjs%2C%20es-brightgreen.svg)
[![License](https://img.shields.io/github/license/wsmd/typing-monitor.svg)](https://github.com/wsmd/typing-monitor/blob/master/LICENSE)

### <img src="https://raw.githubusercontent.com/wsmd/typing-monitor/master/logo/logo.png" alt="TypingMonitor" width="280" />

> Keyboard typing detection made easy.

## Why?

`TypingMonitor` is a keyboard-input detection library for the web.

It helps you detect when a user starts or stops typing inside your app. One of the most common use cases of this library is detecting input/keyboard activity in messaging and chat-based applications.

## Installation

To install `TypingMonitor` as a CommonJS module via a package manager:

```bash
# using npm
npm install --save typing-monitor

# using yarn
yarn add typing-monitor
```

```js
import TypingMonitor from 'typing-monitor'
```

If you are not using a package manager or a module bundler, you can access the pre-compiled production and development UMD builds [from here]().

You can include the build file in a script tag on your page. The UMD builds make `TypingMonitor` available as a `window.TypingMonitor` global variable.

## API

`TypingMonitor` offers 3 different interfaces to handle different scenarios:

- [`TypingMonitor.Static → StaticTypingMonitor`](#new-typingmonitorstaticoptions-object--statictypingmonitor)
- [`TypingMonitor.Global → GlobalTypingMonitor`](#new-typingmonitorglobaloptions--globaltypingmonitor)
- [`TypingMonitor.Listener → ListenerTypingMonitor`](#new-typingmonitorlisteneroptions--listenertypingmonitor)

### `new TypingMonitor.Static(options: Object)` → `StaticTypingMonitor`

#### Highlights

- Meant to be used within an exiting `input` event handler (e.g. `React`'s `onInput`).
- `TypingMonitor.Static` is an alias of `TypingMonitor`

```js
import TypingMonitor from 'typing-monitor';

const monitor = new TypingMonitor({/* options */});

// or

const monitor = new TypingMonitor.Static({/* options */});
```

#### Options

- `wait` (*Number*): duration, in milliseconds, between each call to determine if the user has stopped typing.

#### Instance Methods

#### `monitor.listen(listener: boolean → void)`

Used to detect whether or not the user is typing.

##### Arguments

1. `listener: boolean → void`: A callback function to be called every time the user started or stopped typing. Has one argument of type `boolean` indicating the typing status.

#### Example

```js
import TypingMonitor from 'typing-monitor';

class MessageInput extends React.Component {
  componentDidMount() {
    const { discussion, user } = this.props;
    this.dbRef = db.ref(`/discussions/${discussion.id}/users/${user.id}`);
    // using TypingMonitor is the same as using TypingMonitor.Static
    this.typingMonitor = new TypingMonitor.Static({ wait: 1000 });
  }

  handleInput(e) {
    this.setState({ value: e.target.value });
    this.typingMonitor.listen((isTyping) => {
      this.dbRef.child('userTyping').set(isTyping);
    });
  }

  render() {
    return (
      <input onInput={this.handleInput} value={this.state.value} />
    );
  }
}
```

### `new TypingMonitor.Global(options)` → `GlobalTypingMonitor`

#### Highlights

- Listens to the `input` event on the global/window.
- New instances of `GlobalTypingMonitor` references a singleton.
- Every `monitor#listen` registers a new listener.
- Each `monitor#listen` returns a function to unsubscribe the listener.

#### Options

- `wait` (*Number*): duration, in milliseconds, between each input change to determine if the user stopped typing.

#### Instance Methods

#### `monitor.listen(listener: boolean → void): unsubscribe`

Used to detect whether or not the user is typing.

##### Arguments

1. `listener` (*Function*): A callback function to be called every time the user starts or stops typing. Has one argument of type `boolean` indicating the typing status.

##### Returns

`unsubscribe` (*Function*): A function that unsubscribes the listener

**Example**

```js
import TypingMonitor from 'typing-monitor';

const globalMonitor = new TypingMonitor.Global({ wait: 1000 });

const unsubscribe = globalMonitor.listen((isTyping) => {
  console.log(isTyping ? 'user is typing' : 'user stopped typing');
});

unsubscribe(); // stop listening
```

### `new TypingMonitor.Listener(options)` → `ListenerTypingMonitor`

#### Highlights

- Listens to the `input` event of the element passed to `options.input`
- Works only on `<input />` and `<textarea />`
- Every `monitor#listen` registers a new listener

#### Options

- `wait` (*Number*): duration, in milliseconds, between each input change to determine if the user stopped typing.
- `input: HTMLInputElement | HTMLTextAreaElement`.

#### Instance Methods

#### `monitor.listen(listener: boolean → void): unsubscribe`

Used to detect whether or not the user is typing.

##### Arguments

1. `listener` (*Function*): A callback function to be called every time the user starts or stops typing. Has one argument of type `boolean` indicating the typing status.

##### Returns

`unsubscribe` (*Function*): A function that unsubscribes the listener

**Example**

```js
import TypingMonitor from 'typing-monitor';

const listenerMonitor = new TypingMonitor.Listener({
  input: document.querySelector('input.MyFancyInput'),
  wait: 1000,
});

const unsubscribe = listenerMonitor.listen((isTyping) => {
  console.log(isTyping ? 'typing' : 'stopped');
});

unsubscribe(); // stop listening
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

MIT
