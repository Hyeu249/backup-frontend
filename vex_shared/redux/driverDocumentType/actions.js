const actions = {
  INSERT_DRIVER_DOCUMENT_TYPE: 'INSERT_DRIVER_DOCUMENT_TYPE',
  UPDATE_DRIVER_DOCUMENT_TYPE: 'UPDATE_DRIVER_DOCUMENT_TYPE',
  GET_DRIVER_DOCUMENT_TYPE: 'GET_DRIVER_DOCUMENT_TYPE',
  DELETE_DRIVER_DOCUMENT_TYPE: 'DELETE_DRIVER_DOCUMENT_TYPE',

  LOAD_DRIVER_DOCUMENT_TYPE: 'LOAD_DRIVER_DOCUMENT_TYPE',

  SET_VIEWED_DRIVER_DOCUMENT_TYPE: 'SET_VIEWED_DRIVER_DOCUMENT_TYPE',
  UPDATE_VIEWED_DRIVER_DOCUMENT_TYPE: 'UPDATE_VIEWED_DRIVER_DOCUMENT_TYPE',
  REMOVE_VIEWED_DRIVER_DOCUMENT_TYPE: 'REMOVE_VIEWED_DRIVER_DOCUMENT_TYPE',
  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_DRIVER_DOCUMENT_TYPE });
    };
  },
  createDriverDocumentType: payload => ({
    type: actions.INSERT_DRIVER_DOCUMENT_TYPE,
    payload,
  }),
  updateDriverDocumentType: payload => ({
    type: actions.UPDATE_DRIVER_DOCUMENT_TYPE,
    payload,
  }),
  deleteDriverDocumentType: driverDocumentTypeID => ({
    type: actions.DELETE_DRIVER_DOCUMENT_TYPE,
    driverDocumentTypeID,
  }),
  setViewedDriverDocumentType: driverDocumentType => ({
    type: actions.SET_VIEWED_DRIVER_DOCUMENT_TYPE,
    driverDocumentType,
  }),
  removeViewedDriverDocumentType: () => ({
    type: actions.REMOVE_VIEWED_DRIVER_DOCUMENT_TYPE,
  }),
};

export default actions;
