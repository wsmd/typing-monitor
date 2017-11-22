> ⚠️ This is under active development and not available for production use yet.

# <img src="https://user-images.githubusercontent.com/2100222/32193191-e9f0c0a4-bd8c-11e7-8c1c-a47c4cf8e456.png" alt="TypingMonitor" width="280" />

> Keyboard typing detection made easy.

## Why `TypingMonitor`?

## API

`TypingMonitor` offers 3 different interfaces for different scenarios:

- [`TypingMonitor.Static → StaticTypingMonitor`](#typingmonitorstaticoptions-%E2%86%92-statictypingmonitor)
- [`TypingMonitor.Global → GlobalTypingMonitor`](#typingmonitorglobaloptions-%E2%86%92-globaltypingmonitor)
- [`TypingMonitor.Listener → ListenerTypingMonitor`](#typingmonitorlisteneroptions-%E2%86%92-listenertypingmonitor)

### `new TypingMonitor.Static(options: Object)` → `StaticTypingMonitor`

#### Highlights

- `TypingMonitor` is an alias of `TypingMonitor.Static`.
- Used independently without listening to actual inputs.
- Meant to be used within existing event handlers; e.g. `React`'s `onInput`.

#### Options

- `wait` (*Number*): duration, in milliseconds, between each input change to determine if the user stopped typing.

#### Instance Methods

#### `monitor.listen(listener: boolean → void)`

Used to detect if whether or not the user is typing. Ideally, it should be called within an event handler.

##### Arguments

1. `listener: boolean → void`: A callback function to be called every time the user started or stopped typing. Has one argument of type `boolean` indicating the typing status.

#### Example

```js
import TypingMonitor from 'typing-monitor';

class MessageInput extends React.Component {
  componentDidMount() {
    const { discussion, user } = this.props;
    this.dbRef = db.ref(`/discussions/${discussion.id}/users/${user.id}`);
    // using TypingMonitor is same as using TypingMonitor.Static
    this.typingMonitor = new TypingMonitor({ wait: 1000 });
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

**Notes**

- Listens to the global/window 'input' event
- Works only to `<input />` and `<textarea />`
- Instances of GlobalTypingMonitor points to a singleton
- `monitor#listen` adds a new handler
- `monitor#listen` returns a destroy method for a specific handler

#### Options

- `wait` (*Number*): duration, in milliseconds, between each input change to determine if the user stopped typing.

#### Instance Methods

#### `monitor.listen(listener: boolean → void)`

Used to detect if whether or not the user is typing. Ideally, it should be called within an event handler.

**Example**

```js
import TypingMonitor from 'typing-monitor';

const globalMonitor = new TypingMonitor.Global({ wait: 1000 });

const unsubscribe = globalMonitor.listen((isTyping) => {
  console.log(isTyping ? 'typing' : 'stopped');
});

unsubscribe(); // stop listening
```

### `new TypingMonitor.Listener(options)` → `ListenerTypingMonitor`

**Notes**

- Listens to the `input` event of `options.input`
- Works only to `<input />` and `<textarea />`
- Assigns a new handler on each `monitor#listen`
- `monitor#listen` returns a destroy method for each handler

#### Options

- `wait: Number`: duration, in milliseconds, between each input change to determine if the user stopped typing.
- `input: HTMLInputElement | HTMLTextAreaElement`:

#### Instance Methods

#### `monitor.listen(listener: boolean → void)`

Used to detect if whether or not the user is typing. Ideally, it should be called within an event handler.

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
