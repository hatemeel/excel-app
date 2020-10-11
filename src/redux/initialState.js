import { DEFAULT_STYLES, DEFAULT_TITLE } from '../constants';
import { storage } from '../core/utils';

const defaultState = {
  title: DEFAULT_TITLE,
  columnSizeState: {},
  rowSizeState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES,
};

export const initialState = storage('excel-state') || defaultState;
