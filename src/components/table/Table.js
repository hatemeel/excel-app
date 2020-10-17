import { DEFAULT_STYLES } from '../../constants';
import { $dom } from '../../core/DOM';
import { ExcelComponent } from '../../core/ExcelComponent';
import { parse } from '../../core/parse';
import {
  applyStyleAction,
  changeStylesAction,
  changeTextAction,
  tableResizeAction,
} from '../../redux/actions';
import { isCell, matrix, shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });

    this.resizing = false;
  }

  toHTML() {
    return createTable({ state: this.store.getState() });
  }

  beforeInit() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find(`[data-id="1:1"]`);
    this.selectCell($cell);

    this.$on('formula:input', (value) => {
      this.selection.current.attr('data-value', value).text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:submit', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        applyStyleAction({ value, ids: this.selection.selectedIds })
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(...Object.keys(DEFAULT_STYLES));
    this.$dispatch(changeStylesAction(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(tableResizeAction(data));
    } catch (error) {
      console.error(error);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $dom(event.target);

      if (!event.shiftKey) {
        this.selectCell($target);
      } else {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.data.id.split(':');
      const $next = this.$root.find(getNextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.updateTextInStore($dom(event.target).text());
  }

  updateTextInStore(value) {
    this.$dispatch(
      changeTextAction({ id: this.selection.current.data.id, value })
    );
  }
}

function getNextSelector(key, [row, col]) {
  const MIN_VALUE = 1;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;

    case 'Tab':
    case 'ArrowRight':
      col++;
      break;

    case 'ArrowLeft':
      if (col > MIN_VALUE) {
        col--;
      }
      break;

    case 'ArrowUp':
      if (row > MIN_VALUE) {
        row--;
      }
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
