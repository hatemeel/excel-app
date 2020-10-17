import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_LAST_ACTIVITY_DATE,
} from './types';

export const tableResizeAction = (data) => {
  return {
    type: TABLE_RESIZE,
    data,
  };
};

export const changeTextAction = (data) => {
  return {
    type: CHANGE_TEXT,
    data,
  };
};

export const changeStylesAction = (data) => {
  return {
    type: CHANGE_STYLES,
    data,
  };
};

export const applyStyleAction = (data) => {
  return {
    type: APPLY_STYLE,
    data,
  };
};

export const changeTitleAction = (data) => {
  return {
    type: CHANGE_TITLE,
    data,
  };
};

export const updateLastActivityDateAction = () => {
  return {
    type: UPDATE_LAST_ACTIVITY_DATE,
  };
};
