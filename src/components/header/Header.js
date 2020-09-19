import { ExcelComponent } from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  toHTML() {
    return `
			<input
				type="text"
				class="input"
				value="New table"
				placeholder="Table name"
			/>

			<div>
				<button class="button button-delete">
					<i class="ri-delete-bin-7-line"></i>
				</button>

				<button class="button button-exit">
					<i class="ri-logout-box-r-line"></i>
				</button>
			</div>
		`;
  }
}
