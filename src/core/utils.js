import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return '';
  }

  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

export const range = (start, end) => {
  start = parseInt(start);
  end = parseInt(end);

  if (start > end) {
    [start, end] = [end, start];
  }

  return Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index);
};

export const storage = (key, data) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export const isEqual = (a, b) => {
  if (a instanceof Object && b instanceof Object) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
};

export const camelToDashCase = (str) => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join('; ');
};

export const debounce = (fn, wait) => {
  let timeout;

  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const clone = (object) => {
  return JSON.parse(JSON.stringify(object));
};

export const exportToExcel = (tableId) => {
  const table = storage(`excel:${tableId}`);

  let tableData = [];
  Object.keys(table.dataState).map((key) => {
    const { row, col } = parseCellId(key);
    if (!tableData[row]) {
      tableData[row] = [];
    }
    tableData[row][col] = table.dataState[key];
  });
  tableData = tableData.map((arr) => {
    const arrFilled = Array(arr.length).fill('');
    arr.map((el, index) => {
      arrFilled[index] = el;
    });
    return arrFilled;
  });

  const worksheet = XLSX.utils.json_to_sheet(tableData, { skipHeader: true });

  const workbook = {
    Sheets: { data: worksheet },
    SheetNames: ['data'],
  };

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const EXCEL_EXTENSION = '.xlsx';

  const data = new Blob([excelBuffer], {
    type: EXCEL_TYPE,
  });

  const fileName = table.title.replace(/ /g, '_');

  FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
};

export const parseCellId = (id, subtract = true) => {
  return {
    row: id.split(':')[0] - subtract,
    col: id.split(':')[1] - subtract,
  };
};
