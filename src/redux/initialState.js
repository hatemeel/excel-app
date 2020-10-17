import { DEFAULT_STYLES, DEFAULT_TITLE } from '../constants';
import { clone, storage } from '../core/utils';

const defaultState = {
  title: DEFAULT_TITLE,
  columnSizeState: {},
  rowSizeState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES,
  lastActivity: new Date().toISOString(),
};

export const initialState = (storageName) =>
  storage(storageName) || clone(defaultState);
