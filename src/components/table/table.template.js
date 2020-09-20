const CODES = {
  A: 65,
  Z: 90,
};

const toCell = (_, index) => {
  return `
		<div class="cell" contenteditable data-column="${index}"></div>
	`;
};

const toColumn = (col, index) => {
  return `
		<div class="column" data-type="resizable" data-column="${index}">
			${col}
			<div class="column-resize" data-resize="column"></div>
		</div>
	`;
};

const createRow = (index, content = '') => {
  return `
		<div class="row" ${index ? 'data-type="resizable"' : ''}>
			<div class="row-info">
				${index || ''}
			</div>
			${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
			<div class="row-data">${content}</div>
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

  for (let i = 0; i < rowsCount; i++) {
    const cells = Array(colsCount).fill('').map(toChar).map(toCell).join('');

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
};
