const actions = {
  INSERT_VEHICLE_DOCUMENT_TYPE: 'INSERT_VEHICLE_DOCUMENT_TYPE',
  GET_VEHICLE_DOCUMENT_TYPE: 'GET_VEHICLE_DOCUMENT_TYPE',
  UPDATE_VEHICLE_DOCUMENT_TYPE: 'UPDATE_VEHICLE_DOCUMENT_TYPE',
  DELETE_VEHICLE_DOCUMENT_TYPE: 'DELETE_VEHICLE_DOCUMENT_TYPE',

  LOAD_VEHICLE_DOCUMENT_TYPE: 'LOAD_VEHICLE_DOCUMENT_TYPE',
  REMOVE_VEHICLE_DOCUMENT_TYPE: 'REMOVE_VEHICLE_DOCUMENT_TYPE',

  SET_VIEWED_VEHICLE_DOCUMENT_TYPE: 'SET_VIEWED_VEHICLE_DOCUMENT_TYPE',
  UPDATE_VIEWED_VEHICLE_DOCUMENT_TYPE: 'UPDATE_VIEWED_VEHICLE_DOCUMENT_TYPE',
  REMOVE_VIEWED_VEHICLE_DOCUMENT_TYPE: 'REMOVE_VIEWED_VEHICLE_DOCUMENT_TYPE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_VEHICLE_DOCUMENT_TYPE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VEHICLE_DOCUMENT_TYPE });
    };
  },
  createVehicleDocumentType: payload => ({
    type: actions.INSERT_VEHICLE_DOCUMENT_TYPE,
    payload,
  }),
  updateVehicleDocumentType: payload => ({
    type: actions.UPDATE_VEHICLE_DOCUMENT_TYPE,
    payload,
  }),
  deleteVehicleDocumentType: vehicleDocumentTypeID => ({
    type: actions.DELETE_VEHICLE_DOCUMENT_TYPE,
    vehicleDocumentTypeID,
  }),
  setViewedVehicleDocumentType: payload => ({
    type: actions.SET_VIEWED_VEHICLE_DOCUMENT_TYPE,
    payload,
  }),
  removeViewedVehicleDocumentType: () => ({
    type: actions.REMOVE_VIEWED_VEHICLE_DOCUMENT_TYPE,
  }),
};

export default actions;
