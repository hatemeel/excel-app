import { dom } from '../../core/DOM';

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = dom.create('div', 'excel');

    this.components.map((Component) => {
      const $el = dom.create('div', Component.className);

      const component = new Component($el);

      $el.innerHTML = component.toHTML();

      $root.append($el);
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
