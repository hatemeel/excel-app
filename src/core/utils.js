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
