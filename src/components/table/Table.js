import { ExcelComponent } from '../../core/ExcelComponent';
import { shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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
    }
  }
}
