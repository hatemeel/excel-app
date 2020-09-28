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
