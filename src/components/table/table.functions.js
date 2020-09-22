import { range } from '../../core/utils';

export const shouldResize = (event) => {
  return event.target.dataset.resize;
};

export const isCell = (event) => {
  return event.target.dataset.type === 'cell';
};

export const matrix = (target, current) => {
  target = target.data.id.split(':');
  current = current.data.id.split(':');

  const rows = range(target[0], current[0]);
  const cols = range(target[1], current[1]);

  return rows.reduce((acc, row) => {
    cols.map((col) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
};
