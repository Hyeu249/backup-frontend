const actions = {
  //tyre
  GET_TYRE: 'GET_TYRE',
  INSERT_TYRE: 'INSERT_TYRE',
  UPDATE_TYRE: 'UPDATE_TYRE',
  DELETE_TYRE: 'DELETE_TYRE',

  LOAD_TYRE: 'LOAD_TYRE',
  REMOVE_TYRE: 'REMOVE_TYRE',

  SET_VIEWED_TYRE: 'SET_VIEWED_TYRE',
  UPDATE_VIEWED_TYRE: 'UPDATE_VIEWED_TYRE',
  REMOVE_VIEWED_TYRE: 'REMOVE_VIEWED_TYRE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_TYRE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_TYRE });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_TYRE, payload });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_TYRE });
    };
  },

  createTyre: payload => ({ type: actions.INSERT_TYRE, payload }),
  setViewedTyre: payload => ({ type: actions.SET_VIEWED_TYRE, payload }),
  removeViewedTyre: () => ({ type: actions.REMOVE_VIEWED_TYRE }),
  updateTyre: payload => ({ type: actions.UPDATE_TYRE, payload }),
  deleteTyre: tyreID => ({ type: actions.DELETE_TYRE, tyreID }),
};
export default actions;
