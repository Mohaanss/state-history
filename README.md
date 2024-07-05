# StateHistory

`StateHistory` is a JavaScript library for managing state history in applications. It allows you to track state changes and easily navigate through previous versions of the state, with undo/redo capabilities.

## Installation

You can install the library via NPM:

```sh
npm install state-history
```

Code Sample

```js
import React, { useState, useEffect } from "react";
import StateHistory from "state-history-react";

const stateManager = new StateHistory();

const App = () => {
  const [state, setState] = useState({ value: 0 });

  useEffect(() => {
    stateManager.initState(state);

    const handleStateChange = (newState) => {
      setState(newState);
    };

    stateManager.subscribe(handleStateChange);
    return () => {
      stateManager.unsubscribe(handleStateChange);
    };
  }, []);

  const increment = () => {
    stateManager.setState({ value: state.value + 1 });
  };

  const decrement = () => {
    stateManager.setState({ value: state.value - 1 });
  };

  const undo = () => {
    stateManager.undo();
  };

  const redo = () => {
    stateManager.redo();
  };

  return (
    <div>
      <h1>Value: {state.value}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={undo} disabled={!stateManager.canUndo()}>
        Undo
      </button>
      <button onClick={redo} disabled={!stateManager.canRedo()}>
        Redo
      </button>
    </div>
  );
};

export default App;
```
