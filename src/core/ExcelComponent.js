import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscriptions = [];
    this.storeSubscription = null;

    this.beforeInit();
  }

  beforeInit() {}

  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const subscription = this.emitter.subscribe(event, fn);
    this.subscriptions.push(subscription);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSubscription = this.store.subscribe(fn);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.subscriptions.map(({ unsubscribe }) => unsubscribe());
    this.storeSubscription.unsubscribe();
  }
}
