import { ExcelComponent } from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
    });
  }

  toHTML() {
    return `
			<button class="button">
				<i class="ri-align-left"></i>
			</button>
			<button class="button">
				<i class="ri-align-center"></i>
			</button>
			<button class="button">
				<i class="ri-align-right"></i>
			</button>
			<button class="button">
				<i class="ri-bold"></i>
			</button>
			<button class="button">
				<i class="ri-italic"></i>
			</button>
			<button class="button">
				<i class="ri-underline"></i>
			</button>
		`;
  }

  onClick(event) {
    console.log(event.target);
  }
}
