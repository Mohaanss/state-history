class StateHistory {
  history = [];
  currentIndex = -1;
  listeners = [];

  initState = (initialState) => {
    this.history = [initialState];
    this.currentIndex = 0;
    this.notify();
  };

  getState = () => {
    return this.history[this.currentIndex];
  };

  setState = (newState) => {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(newState);
    this.currentIndex++;
    this.notify();
  };

  undo = () => {
    if (this.canUndo()) {
      this.currentIndex--;
      this.notify();
    }
  };

  redo = () => {
    if (this.canRedo()) {
      this.currentIndex++;
      this.notify();
    }
  };

  canUndo = () => {
    return this.currentIndex > 0;
  };

  canRedo = () => {
    return this.currentIndex < this.history.length - 1;
  };

  getHistory = () => {
    return this.history;
  };

  subscribe = (listener) => {
    this.listeners.push(listener);
  };

  unsubscribe = (listener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
  };

  notify = () => {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  };
}

export default StateHistory;
