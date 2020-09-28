import { TABLE_RESIZE } from './types';

export const rootReducer = (state, action) => {
  let prevState;
  let stateName;

  switch (action.type) {
    case TABLE_RESIZE:
      stateName = `${action.data.resize}SizeState`;
      prevState = state[stateName] || {};

      return {
        ...state,
        [stateName]: { ...prevState, [action.data.id]: action.data.value },
      };

    default:
      return state;
  }
};
