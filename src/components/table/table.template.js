import {
  DEFAULT_STYLES,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
} from '../../constants';
import { parse } from '../../core/parse';
import { toInlineStyles } from '../../core/utils';

const toCell = (rowIndex, { columnSizeState, dataState, stylesState }) => {
  return (_, columnIndex) => {
    const id = `${rowIndex + 1}:${columnIndex + 1}`;
    const width = columnSizeState[columnIndex + 1] || DEFAULT_COLUMN_WIDTH;
    const styles = toInlineStyles({ ...stylesState[id], ...DEFAULT_STYLES });

    return `
			<div
				class="cell"
				contenteditable
				data-column="${columnIndex + 1}"
				data-type="cell"
				data-id="${id}"
				data-value="${dataState[id] || ''}"
				style="width: ${width}px; ${styles}"
			>${parse(dataState[id]) || ''}</div>
		`;
  };
};

const toColumn = ({ columnIndex, columnName, width }) => {
  return `
		<div
			class="column"
			data-type="resizable"
			data-column="${columnIndex + 1}"
			style="width: ${width}"
		>
  		<span>${columnName}</span>
  		<div class="column-resize" data-resize="column"></div>
  	</div>
  `;
};

const createRow = (rowIndex, content = '', { rowSizeState } = {}) => {
  return `
		<div
			class="row"
			${rowIndex ? 'data-type="resizable"' : ''} 
			data-row="${rowIndex || ''}"
			${
        rowIndex &&
        `style="height: ${rowSizeState[rowIndex] || DEFAULT_ROW_HEIGHT}px"`
      }
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

const formColumnData = ({ columnSizeState }) => {
  return (columnName, columnIndex) => {
    return {
      columnName,
      columnIndex,
      width: (columnSizeState[columnIndex + 1] || DEFAULT_COLUMN_WIDTH) + 'px',
    };
  };
};

export const createTable = ({
  rowsCount = 50,
  colsCount = 50,
  state = {},
} = {}) => {
  const rows = [];

  const cols = Array(colsCount)
    .fill('')
    .map(toChar)
    .map(formColumnData(state))
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols));

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toCell(rowIndex, state))
      .join('');

    rows.push(createRow(rowIndex + 1, cells, state));
  }

  return rows.join('');
};
