const actions = {
  INSERT_FUEL: 'INSERT_FUEL',
  GET_FUEL: 'GET_FUEL',
  UPDATE_FUEL: 'UPDATE_FUEL',
  DELETE_FUEL: 'DELETE_FUEL',

  LOAD_FUEL: 'LOAD_FUEL',
  REMOVE_FUEL: 'REMOVE_FUEL',

  SET_VIEWED_FUEL: 'SET_VIEWED_FUEL',
  UPDATE_VIEWED_FUEL: 'UPDATE_VIEWED_FUEL',
  REMOVE_VIEWED_FUEL: 'REMOVE_VIEWED_FUEL',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_FUEL });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_FUEL });
    };
  },
  createFuel: payload => ({
    type: actions.INSERT_FUEL,
    payload,
  }),
  updateFuel: payload => ({
    type: actions.UPDATE_FUEL,
    payload,
  }),
  deleteFuel: fuelID => ({
    type: actions.DELETE_FUEL,
    fuelID,
  }),
  setViewedFuel: payload => ({
    type: actions.SET_VIEWED_FUEL,
    payload,
  }),
  removeViewedFuel: () => ({ type: actions.REMOVE_VIEWED_FUEL }),
};

export default actions;
