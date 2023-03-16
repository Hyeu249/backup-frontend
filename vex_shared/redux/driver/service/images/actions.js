const actions = {
  //driverDocument image
  LOAD_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT:
    'LOAD_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT',
  REMOVE_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT:
    'REMOVE_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT',

  GET_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT:
    'GET_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT',
  UPLOAD_IMAGE_FOR_DRIVER_DOCUMENT: 'UPLOAD_IMAGE_FOR_DRIVER_DOCUMENT',
  DELETE_IMAGE_FOR_DRIVER_DOCUMENT: 'DELETE_IMAGE_FOR_DRIVER_DOCUMENT',

  //options
  GET_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE:
    'GET_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE',
  LOAD_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE:
    'LOAD_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE',
  REMOVE_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE:
    'REMOVE_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE',

  //images
  initData: driverId => {
    return dispatch => {
      dispatch({
        type: actions.GET_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT,
        driverId,
      });
      dispatch({
        type: actions.GET_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE,
        driverId,
      });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({
        type: actions.REMOVE_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT,
      });
      dispatch({
        type: actions.REMOVE_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE,
      });
    };
  },
  createDriverDocumentImage: payload => ({
    type: actions.UPLOAD_IMAGE_FOR_DRIVER_DOCUMENT,
    payload,
  }),

  deleteDriverDocumentImage: id => {
    return (dispatch, getState) => {
      const driverDocument = getState().driverDocument.viewedDriverDocument;
      dispatch({
        type: actions.DELETE_IMAGE_FOR_DRIVER_DOCUMENT,
        imageIDs: [id],
        driverDocumentID: driverDocument.id,
      });
    };
  },
};
export default actions;
