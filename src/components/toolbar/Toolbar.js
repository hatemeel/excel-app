import { ExcelStateComponent } from '../../core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { $dom } from '../../core/DOM';
import { DEFAULT_STYLES } from '../../constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  beforeInit() {
    this.initState(DEFAULT_STYLES);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $dom(event.target);

    if ($target.data.type === 'tool-button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}
