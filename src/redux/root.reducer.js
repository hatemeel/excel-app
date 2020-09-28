import { TABLE_RESIZE } from './types';

export const rootReducer = (state, action) => {
  let prevState;

  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.columnSizeState || {};

      return {
        ...state,
        columnSizeState: { ...prevState, [action.data.id]: action.data.value },
      };

    default:
      return state;
  }
};
