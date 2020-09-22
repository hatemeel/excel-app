import { $dom } from '../../core/DOM';
import { ExcelComponent } from '../../core/ExcelComponent';
import { isCell, matrix, shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });

    this.resizing = false;
  }

  toHTML() {
    return createTable();
  }

  beforeInit() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const cell = this.$root.find(`[data-id="1:1"]`);
    this.selection.select(cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $dom(event.target);

      if (!event.shiftKey) {
        this.selection.select($target);
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
      this.selection.select($next);
    }
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
