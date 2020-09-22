const CODES = {
  A: 65,
  Z: 90,
};

const toCell = (rowIndex) => {
  return (_, columnIndex) => `
		<div
			class="cell"
			contenteditable
			data-column="${columnIndex}"
			data-type="cell"
			data-id="${rowIndex + 1}:${columnIndex + 1}"
		></div>
	`;
};

const toColumn = (columnName, columnIndex) => {
  return `
		<div class="column" data-type="resizable" data-column="${columnIndex}">
			<span>${columnName}</span>
			<div class="column-resize" data-resize="column"></div>
		</div>
	`;
};

const createRow = (rowIndex, content = '') => {
  return `
		<div class="row" ${rowIndex ? 'data-type="resizable"' : ''}>
			<div class="row-info">${rowIndex || ''}</div>
			<div class="row-data">${content}</div>
			${rowIndex ? '<div class="row-resize" data-resize="row"></div>' : ''}
		</div>
	`;
};

const toChar = (_, index) => {
  return String.fromCharCode(CODES.A + index);
};

export const createTable = (rowsCount = 50) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow(null, cols));

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toCell(rowIndex))
      .join('');

    rows.push(createRow(rowIndex + 1, cells));
  }

  return rows.join('');
};
