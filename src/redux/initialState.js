import { storage } from '../core/utils';

const defaultState = {
  columnSizeState: {},
  rowSizeState: {},
};

export const initialState = storage('excel-state') || defaultState;
