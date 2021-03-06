export class TableSelection {
  static selectedClassName = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clearSelection();
    this.group.push($el);
    this.current = $el;
    $el.focus().class.add(TableSelection.selectedClassName);
  }

  get selectedIds() {
    return this.group.map(($el) => $el.data.id);
  }

  selectGroup($group = []) {
    this.clearSelection();
    this.group = $group;
    this.group.map(($el) => $el.class.add(TableSelection.selectedClassName));
  }

  clearSelection() {
    this.group.map((el) => el.class.remove(TableSelection.selectedClassName));
    this.group.splice(0, this.group.length);
  }

  applyStyle(style) {
    this.group.map(($el) => {
      $el.css(style);
    });
  }
}
