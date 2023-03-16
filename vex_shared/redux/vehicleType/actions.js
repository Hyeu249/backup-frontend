const actions = {
  INSERT_VEHICLE_TYPE: 'INSERT_VEHICLE_TYPE',
  GET_VEHICLE_TYPE: 'GET_VEHICLE_TYPE',
  UPDATE_VEHICLE_TYPE: 'UPDATE_VEHICLE_TYPE',
  DELETE_VEHICLE_TYPE: 'DELETE_VEHICLE_TYPE',

  LOAD_VEHICLE_TYPE: 'LOAD_VEHICLE_TYPE',
  REMOVE_VEHICLE_TYPE: 'REMOVE_VEHICLE_TYPE',

  SET_VIEWED_VEHICLE_TYPE: 'SET_VIEWED_VEHICLE_TYPE',
  UPDATE_VIEWED_VEHICLE_TYPE: 'UPDATE_VIEWED_VEHICLE_TYPE',
  REMOVE_VIEWED_VEHICLE_TYPE: 'REMOVE_VIEWED_VEHICLE_TYPE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_VEHICLE_TYPE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VEHICLE_TYPE });
    };
  },
  createVehicleType: payload => ({
    type: actions.INSERT_VEHICLE_TYPE,
    payload,
  }),
  updateVehicleType: payload => ({
    type: actions.UPDATE_VEHICLE_TYPE,
    payload,
  }),
  deleteVehicleType: vehicleTypeID => ({
    type: actions.DELETE_VEHICLE_TYPE,
    vehicleTypeID,
  }),
  setViewedVehicleType: payload => ({
    type: actions.SET_VIEWED_VEHICLE_TYPE,
    payload,
  }),
  removeViewedVehicleType: () => ({ type: actions.REMOVE_VIEWED_VEHICLE_TYPE }),
};

export default actions;
