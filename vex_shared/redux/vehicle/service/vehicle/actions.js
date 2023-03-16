const actions = {
  //vehicle
  GET_VEHICLE: 'GET_VEHICLE',
  INSERT_VEHICLE: 'INSERT_VEHICLE',
  UPDATE_VEHICLE: 'UPDATE_VEHICLE',
  DELETE_VEHICLE: 'DELETE_VEHICLE',

  LOAD_VEHICLE: 'LOAD_VEHICLE',
  REMOVE_VEHICLE: 'REMOVE_VEHICLE',

  SET_VIEWED_VEHICLE: 'SET_VIEWED_VEHICLE',
  UPDATE_VIEWED_VEHICLE: 'UPDATE_VIEWED_VEHICLE',
  REMOVE_VIEWED_VEHICLE: 'REMOVE_VIEWED_VEHICLE',

  //options
  GET_VEHICLE_TYPE_IN_VEHICLE: 'GET_VEHICLE_TYPE_IN_VEHICLE',
  LOAD_VEHICLE_TYPE_IN_VEHICLE: 'LOAD_VEHICLE_TYPE_IN_VEHICLE',
  REMOVE_VEHICLE_TYPE_IN_VEHICLE: 'REMOVE_VEHICLE_TYPE_IN_VEHICLE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_VEHICLE });
      dispatch({ type: actions.GET_VEHICLE_TYPE_IN_VEHICLE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VEHICLE });
      dispatch({ type: actions.REMOVE_VEHICLE_TYPE_IN_VEHICLE });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_VEHICLE, payload });
      dispatch({ type: actions.GET_VEHICLE_TYPE_IN_VEHICLE });
    };
  },
  removeInitEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_VEHICLE });
      dispatch({ type: actions.REMOVE_VEHICLE_TYPE_IN_VEHICLE });
    };
  },

  createVehicle: payload => ({ type: actions.INSERT_VEHICLE, payload }),
  setViewedVehicle: payload => ({ type: actions.SET_VIEWED_VEHICLE, payload }),
  removeViewedVehicle: () => ({ type: actions.REMOVE_VIEWED_VEHICLE }),
  updateVehicle: payload => ({ type: actions.UPDATE_VEHICLE, payload }),
  deleteVehicle: vehicleID => ({ type: actions.DELETE_VEHICLE, vehicleID }),
};
export default actions;
