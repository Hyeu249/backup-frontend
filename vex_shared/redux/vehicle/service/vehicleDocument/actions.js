const actions = {
  GET_VEHICLE_DOCUMENT: 'GET_VEHICLE_DOCUMENT',
  CREATE_VEHICLE_DOCUMENT: 'CREATE_VEHICLE_DOCUMENT',
  DELETE_VEHICLE_DOCUMENT: 'DELETE_VEHICLE_DOCUMENT',

  LOAD_VEHICLE_DOCUMENT: 'LOAD_VEHICLE_DOCUMENT',
  REMOVE_VEHICLE_DOCUMENT: 'REMOVE_VEHICLE_DOCUMENT',

  SET_VIEWED_VEHICLE_DOCUMENT: 'SET_VIEWED_VEHICLE_DOCUMENT',
  LOAD_VIEWED_VEHICLE_DOCUMENT: 'LOAD_VIEWED_VEHICLE_DOCUMENT',
  REMOVE_VIEWED_VEHICLE_DOCUMENT: 'REMOVE_VIEWED_VEHICLE_DOCUMENT',

  //options
  GET_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT:
    'GET_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT',
  LOAD_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT:
    'LOAD_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT',
  REMOVE_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT:
    'REMOVE_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT',

  initData: vehicleId => {
    return dispatch => {
      dispatch({
        type: actions.GET_VEHICLE_DOCUMENT,
        vehicleId,
      });
      dispatch({ type: actions.GET_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT });
    };
  },

  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VEHICLE_DOCUMENT });
      dispatch({
        type: actions.REMOVE_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT,
      });
    };
  },

  createVehicleDocument: payload => ({
    type: actions.CREATE_VEHICLE_DOCUMENT,
    payload,
  }),
  deleteVehicleDocument: payload => ({
    type: actions.DELETE_VEHICLE_DOCUMENT,
    id: payload.id,
    vehicleId: payload.vehicleId,
  }),

  //VIEWED
  setViewedVehicleDocument: payload => ({
    type: actions.SET_VIEWED_VEHICLE_DOCUMENT,
    payload,
  }),
  removeViewedVehicleDocument: () => ({
    type: actions.REMOVE_VIEWED_VEHICLE_DOCUMENT,
  }),
};
export default actions;
