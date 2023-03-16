const actions = {
  GET_DRIVER_DOCUMENT: 'GET_DRIVER_DOCUMENT',
  CREATE_DRIVER_DOCUMENT: 'CREATE_DRIVER_DOCUMENT',
  DELETE_DRIVER_DOCUMENT: 'DELETE_DRIVER_DOCUMENT',

  LOAD_DRIVER_DOCUMENT: 'LOAD_DRIVER_DOCUMENT',
  REMOVE_DRIVER_DOCUMENT: 'REMOVE_DRIVER_DOCUMENT',

  SET_VIEWED_DRIVER_DOCUMENT: 'SET_VIEWED_DRIVER_DOCUMENT',
  LOAD_VIEWED_DRIVER_DOCUMENT: 'LOAD_VIEWED_DRIVER_DOCUMENT',
  REMOVE_VIEWED_DRIVER_DOCUMENT: 'REMOVE_VIEWED_DRIVER_DOCUMENT',

  //options
  GET_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT:
    'GET_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT',
  LOAD_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT:
    'LOAD_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT',
  REMOVE_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT:
    'REMOVE_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT',

  initData: driverId => {
    return dispatch => {
      dispatch({
        type: actions.GET_DRIVER_DOCUMENT,
        driverId,
      });
      dispatch({ type: actions.GET_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT });
    };
  },

  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_DRIVER_DOCUMENT });
      dispatch({
        type: actions.REMOVE_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT,
      });
    };
  },

  createDriverDocument: payload => ({
    type: actions.CREATE_DRIVER_DOCUMENT,
    payload,
  }),
  deleteDriverDocument: payload => ({
    type: actions.DELETE_DRIVER_DOCUMENT,
    id: payload.id,
    driverId: payload.driverId,
  }),

  //VIEWED
  setViewedDriverDocument: payload => ({
    type: actions.SET_VIEWED_DRIVER_DOCUMENT,
    payload,
  }),
  removeViewedDriverDocument: () => ({
    type: actions.REMOVE_VIEWED_DRIVER_DOCUMENT,
  }),
};
export default actions;
