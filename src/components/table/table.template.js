const toCell = (rowIndex) => {
  return (_, columnIndex) => `
		<div
			class="cell"
			contenteditable
			data-column="${columnIndex + 1}"
			data-type="cell"
			data-id="${rowIndex + 1}:${columnIndex + 1}"
		></div>
	`;
};

const toColumn = (columnName, columnIndex) => {
  return `
		<div class="column" data-type="resizable" data-column="${columnIndex + 1}">
			<span>${columnName}</span>
			<div class="column-resize" data-resize="column"></div>
		</div>
	`;
};

const createRow = (rowIndex, content = '') => {
  return `
		<div
			class="row"
			${rowIndex ? 'data-type="resizable"' : ''} 
			data-row="${rowIndex}"
		>
			<div class="row-info">${rowIndex || ''}</div>
			<div class="row-data">${content}</div>
			${rowIndex ? '<div class="row-resize" data-resize="row"></div>' : ''}
		</div>
	`;
};

const toChar = (_, index) => {
  let colName = '';
  let dividend = Math.floor(Math.abs(index + 1));
  let rest;

  while (dividend > 0) {
    rest = (dividend - 1) % 26;
    colName = String.fromCharCode(65 + rest) + colName;
    dividend = parseInt((dividend - rest) / 26);
  }
  return colName;
};

export const createTable = (rowsCount = 50) => {
  const colsCount = 50;
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
