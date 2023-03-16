const actions = {
  INSERT_SERVICE_TYPE: 'INSERT_SERVICE_TYPE',
  GET_SERVICE_TYPE: 'GET_SERVICE_TYPE',
  UPDATE_SERVICE_TYPE: 'UPDATE_SERVICE_TYPE',
  DELETE_SERVICE_TYPE: 'DELETE_SERVICE_TYPE',

  LOAD_SERVICE_TYPE: 'LOAD_SERVICE_TYPE',
  REMOVE_SERVICE_TYPE: 'REMOVE_SERVICE_TYPE',

  SET_VIEWED_SERVICE_TYPE: 'SET_VIEWED_SERVICE_TYPE',
  UPDATE_VIEWED_SERVICE_TYPE: 'UPDATE_VIEWED_SERVICE_TYPE',
  REMOVE_VIEWED_SERVICE_TYPE: 'REMOVE_VIEWED_SERVICE_TYPE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_SERVICE_TYPE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_SERVICE_TYPE });
    };
  },
  createServiceType: payload => ({
    type: actions.INSERT_SERVICE_TYPE,
    payload,
  }),
  updateServiceType: payload => ({
    type: actions.UPDATE_SERVICE_TYPE,
    payload,
  }),
  deleteServiceType: serviceTypeID => ({
    type: actions.DELETE_SERVICE_TYPE,
    serviceTypeID,
  }),
  setViewedServiceType: payload => ({
    type: actions.SET_VIEWED_SERVICE_TYPE,
    payload,
  }),
  removeViewedServiceType: () => ({ type: actions.REMOVE_VIEWED_SERVICE_TYPE }),
};

export default actions;
