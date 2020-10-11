import { $dom } from '../../core/DOM';
import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text());
    });
  }

  toHTML() {
    return `
			<div class="formula-icon">fx</div>

			<div
				class="formula-input"
				id="formula"
				contenteditable
				spellcheck="false"
			></div>
		`;
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    this.$emit('formula:input', $dom(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.code)) {
      event.preventDefault();
      this.$emit('formula:submit');
    }
  }
}
