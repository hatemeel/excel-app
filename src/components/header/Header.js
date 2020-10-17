import { DEFAULT_TITLE } from '../../constants';
import { $dom } from '../../core/DOM';
import { ExcelComponent } from '../../core/ExcelComponent';
import { changeTitleAction } from '../../redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || DEFAULT_TITLE;
    return `
			<input
				type="text"
				class="input"
				value="${title}"
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

  onInput(event) {
    const $target = $dom(event.target);
    this.$dispatch(changeTitleAction($target.text()));
  }
}
