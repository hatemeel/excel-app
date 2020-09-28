import { TABLE_RESIZE } from './types';

export const tableResizeAction = (data) => {
  return {
    type: TABLE_RESIZE,
    data,
  };
};
