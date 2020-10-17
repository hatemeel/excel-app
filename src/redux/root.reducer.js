import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_LAST_ACTIVITY_DATE,
} from './types';

export const rootReducer = (state, action) => {
  let field;
  let val;

  switch (action.type) {
    case TABLE_RESIZE:
      field = `${action.data.resize}SizeState`;
      return {
        ...state,
        [field]: value(state, field, action),
      };

    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      };

    case CHANGE_STYLES:
      field = 'currentStyles';
      return {
        ...state,
        [field]: action.data,
      };

    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.map((id) => {
        val[id] = {
          ...val[id],
          ...action.data.value,
        };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };

    case CHANGE_TITLE:
      return {
        ...state,
        title: action.data,
      };

    case UPDATE_LAST_ACTIVITY_DATE:
      return {
        ...state,
        lastActivity: new Date().toISOString(),
      };

    default:
      return state;
  }
};

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  Object.keys(val).map((key) => {
    if (!val[key]) {
      delete val[key];
    }
  });
  return val;
}
