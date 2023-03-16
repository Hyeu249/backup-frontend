const actions = {
  //tyreServiceRequest
  GET_TYRE_SERVICE_REQUEST: 'GET_TYRE_SERVICE_REQUEST',
  INSERT_TYRE_SERVICE_REQUEST: 'INSERT_TYRE_SERVICE_REQUEST',
  UPDATE_TYRE_SERVICE_REQUEST: 'UPDATE_TYRE_SERVICE_REQUEST',
  DELETE_TYRE_SERVICE_REQUEST: 'DELETE_TYRE_SERVICE_REQUEST',

  LOAD_TYRE_SERVICE_REQUEST: 'LOAD_TYRE_SERVICE_REQUEST',
  REMOVE_TYRE_SERVICE_REQUEST: 'REMOVE_TYRE_SERVICE_REQUEST',

  SET_VIEWED_TYRE_SERVICE_REQUEST: 'SET_VIEWED_TYRE_SERVICE_REQUEST',
  UPDATE_VIEWED_TYRE_SERVICE_REQUEST: 'UPDATE_VIEWED_TYRE_SERVICE_REQUEST',
  REMOVE_VIEWED_TYRE_SERVICE_REQUEST: 'REMOVE_VIEWED_TYRE_SERVICE_REQUEST',

  //get options
  GET_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST:
    'GET_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST',
  LOAD_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST:
    'LOAD_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST',
  REMOVE_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST:
    'REMOVE_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_TYRE_SERVICE_REQUEST });
      dispatch({ type: actions.GET_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_TYRE_SERVICE_REQUEST });
      dispatch({
        type: actions.REMOVE_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST,
      });
    };
  },
  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_TYRE_SERVICE_REQUEST, payload });
      dispatch({ type: actions.GET_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_TYRE_SERVICE_REQUEST });
      dispatch({
        type: actions.REMOVE_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST,
      });
    };
  },

  createTyreServiceRequest: payload => ({
    type: actions.INSERT_TYRE_SERVICE_REQUEST,
    payload,
  }),
  updateTyreServiceRequest: payload => ({
    type: actions.UPDATE_TYRE_SERVICE_REQUEST,
    payload,
  }),
  deleteTyreServiceRequest: tyreServiceRequestID => ({
    type: actions.DELETE_TYRE_SERVICE_REQUEST,
    tyreServiceRequestID,
  }),
  setViewedTyreServiceRequest: payload => ({
    type: actions.SET_VIEWED_TYRE_SERVICE_REQUEST,
    payload,
  }),
  removeViewedTyreServiceRequest: () => ({
    type: actions.REMOVE_VIEWED_TYRE_SERVICE_REQUEST,
  }),
};
export default actions;
