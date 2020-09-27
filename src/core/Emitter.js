export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName] instanceof Array) {
      this.listeners[eventName].map((listener) => listener(...args));
      return true;
    }
    return false;
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return {
      unsubscribe: () => {
        this.listeners[event] = this.listeners[event].filter(
          (listener) => listener !== fn
        );
      },
    };
  }
}
