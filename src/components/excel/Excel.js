import { $dom } from '../../core/DOM';
import { Emitter } from '../../core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $dom(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $dom.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const $el = $dom.create('div', Component.className);
      const component = new Component($el, componentOptions);

      if (component.name) {
        window[`C_${component.name}`] = component;
      }

      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.map((component) => component.destroy());
  }
}
