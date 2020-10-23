import { DEFAULT_TITLE } from '../../constants';
import { $dom } from '../../core/DOM';
import { ExcelComponent } from '../../core/ExcelComponent';
import { changeTitleAction } from '../../redux/actions';
import { ActiveRoute } from '../../core/routes/ActiveRoute';
import { exportToExcel } from '../../core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
				<button class="button button-export" data-button="export">
					<i class="ri-file-download-line"></i>
				</button>

				<button class="button button-delete" data-button="delete">
					<i class="ri-delete-bin-7-line"></i>
				</button>

				<button class="button button-exit" data-button="exit">
					<i class="ri-logout-box-r-line"></i>
				</button>
			</div>
		`;
  }

  onInput(event) {
    const $target = $dom(event.target);
    this.$dispatch(changeTitleAction($target.text()));
  }

  onClick(event) {
    const $target = $dom(event.target);

    switch ($target.data.button) {
      case 'export':
        exportToExcel(ActiveRoute.param);
        break;
      case 'delete':
        if (confirm('Do you really want to delete this table?')) {
          localStorage.removeItem(`excel:${ActiveRoute.param}`);
          ActiveRoute.navigate('');
        }
        break;

      case 'exit':
        ActiveRoute.navigate('');
        break;
    }
  }
}
