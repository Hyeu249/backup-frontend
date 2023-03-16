const actions = {
  //driver
  GET_DRIVER: 'GET_DRIVER',
  INSERT_DRIVER: 'INSERT_DRIVER',
  UPDATE_DRIVER: 'UPDATE_DRIVER',
  DELETE_DRIVER: 'DELETE_DRIVER',

  LOAD_DRIVER: 'LOAD_DRIVER',
  REMOVE_DRIVER: 'REMOVE_DRIVER',

  SET_VIEWED_DRIVER: 'SET_VIEWED_DRIVER',
  UPDATE_VIEWED_DRIVER: 'UPDATE_VIEWED_DRIVER',
  REMOVE_VIEWED_DRIVER: 'REMOVE_VIEWED_DRIVER',

  //options
  GET_DRIVER_DEPOSIT_TYPE_IN_DRIVER: 'GET_DRIVER_DEPOSIT_TYPE_IN_DRIVER',
  LOAD_DRIVER_DEPOSIT_TYPE_IN_DRIVER: 'LOAD_DRIVER_DEPOSIT_TYPE_IN_DRIVER',
  REMOVE_DRIVER_DEPOSIT_TYPE_IN_DRIVER: 'REMOVE_DRIVER_DEPOSIT_TYPE_IN_DRIVER',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_DRIVER });
      dispatch({ type: actions.GET_DRIVER_DEPOSIT_TYPE_IN_DRIVER });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_DRIVER });
      dispatch({ type: actions.REMOVE_DRIVER_DEPOSIT_TYPE_IN_DRIVER });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_DRIVER, payload });
      dispatch({ type: actions.GET_DRIVER_DEPOSIT_TYPE_IN_DRIVER });
    };
  },
  removeEditInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_DRIVER });
      dispatch({ type: actions.REMOVE_DRIVER_DEPOSIT_TYPE_IN_DRIVER });
    };
  },

  createDriver: payload => ({ type: actions.INSERT_DRIVER, payload }),
  updateDriver: payload => ({ type: actions.UPDATE_DRIVER, payload }),
  deleteDriver: driverID => ({
    type: actions.DELETE_DRIVER,
    driverID,
  }),
  setViewedDriver: payload => ({
    type: actions.SET_VIEWED_DRIVER,
    payload,
  }),
  removeViewedDriver: () => ({ type: actions.REMOVE_VIEWED_DRIVER }),
};
export default actions;
