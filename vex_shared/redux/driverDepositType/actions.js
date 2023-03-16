const actions = {
  INSERT_DRIVER_DEPOSIT_TYPE: 'INSERT_DRIVER_DEPOSIT_TYPE',
  GET_DRIVER_DEPOSIT_TYPE: 'GET_DRIVER_DEPOSIT_TYPE',
  UPDATE_DRIVER_DEPOSIT_TYPE: 'UPDATE_DRIVER_DEPOSIT_TYPE',
  DELETE_DRIVER_DEPOSIT_TYPE: 'DELETE_DRIVER_DEPOSIT_TYPE',

  LOAD_DRIVER_DEPOSIT_TYPE: 'LOAD_DRIVER_DEPOSIT_TYPE',
  REMOVE_DRIVER_DEPOSIT_TYPE: 'REMOVE_DRIVER_DEPOSIT_TYPE',

  SET_VIEWED_DRIVER_DEPOSIT_TYPE: 'SET_VIEWED_DRIVER_DEPOSIT_TYPE',
  UPDATE_VIEWED_DRIVER_DEPOSIT_TYPE: 'UPDATE_VIEWED_DRIVER_DEPOSIT_TYPE',
  REMOVE_VIEWED_DRIVER_DEPOSIT_TYPE: 'REMOVE_VIEWED_DRIVER_DEPOSIT_TYPE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_DRIVER_DEPOSIT_TYPE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_DRIVER_DEPOSIT_TYPE });
    };
  },
  createDriverDepositType: payload => ({
    type: actions.INSERT_DRIVER_DEPOSIT_TYPE,
    payload,
  }),
  updateDriverDepositType: payload => ({
    type: actions.UPDATE_DRIVER_DEPOSIT_TYPE,
    payload,
  }),
  deleteDriverDepositType: driverDepositTypeID => ({
    type: actions.DELETE_DRIVER_DEPOSIT_TYPE,
    driverDepositTypeID,
  }),
  setViewedDriverDepositType: driverDepositType => ({
    type: actions.SET_VIEWED_DRIVER_DEPOSIT_TYPE,
    driverDepositType,
  }),
  removeViewedDriverDepositType: () => ({
    type: actions.REMOVE_VIEWED_DRIVER_DEPOSIT_TYPE,
  }),
};

export default actions;
