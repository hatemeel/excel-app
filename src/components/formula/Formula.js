import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
			<div class="formula-icon">fx</div>

			<div class="formula-input" contenteditable spellcheck="false"></div>
		`;
  }

  onInput(event) {
    console.log('Formula onInput triggered', event.target.textContent.trim());
  }

  onClick() {
    console.log(this.$root);
  }
}
