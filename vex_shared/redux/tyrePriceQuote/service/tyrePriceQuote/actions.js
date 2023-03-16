const actions = {
  //tyrePriceQuote
  GET_TYRE_PRICE_QUOTE: 'GET_TYRE_PRICE_QUOTE',
  INSERT_TYRE_PRICE_QUOTE: 'INSERT_TYRE_PRICE_QUOTE',
  UPDATE_TYRE_PRICE_QUOTE: 'UPDATE_TYRE_PRICE_QUOTE',
  DELETE_TYRE_PRICE_QUOTE: 'DELETE_TYRE_PRICE_QUOTE',

  LOAD_TYRE_PRICE_QUOTE: 'LOAD_TYRE_PRICE_QUOTE',
  REMOVE_TYRE_PRICE_QUOTE: 'REMOVE_TYRE_PRICE_QUOTE',

  SET_VIEWED_TYRE_PRICE_QUOTE: 'SET_VIEWED_TYRE_PRICE_QUOTE',
  UPDATE_VIEWED_TYRE_PRICE_QUOTE: 'UPDATE_VIEWED_TYRE_PRICE_QUOTE',
  REMOVE_VIEWED_TYRE_PRICE_QUOTE: 'REMOVE_VIEWED_TYRE_PRICE_QUOTE',

  //options
  GET_TYRE_IN_TYRE_PRICE_QUOTE: 'GET_TYRE_IN_TYRE_PRICE_QUOTE',
  LOAD_TYRE_IN_TYRE_PRICE_QUOTE: 'LOAD_TYRE_IN_TYRE_PRICE_QUOTE',
  REMOVE_TYRE_IN_TYRE_PRICE_QUOTE: 'REMOVE_TYRE_IN_TYRE_PRICE_QUOTE',

  GET_SUPPLIER_IN_TYRE_PRICE_QUOTE: 'GET_SUPPLIER_IN_TYRE_PRICE_QUOTE',
  LOAD_SUPPLIER_IN_TYRE_PRICE_QUOTE: 'LOAD_SUPPLIER_IN_TYRE_PRICE_QUOTE',
  REMOVE_SUPPLIER_IN_TYRE_PRICE_QUOTE: 'REMOVE_SUPPLIER_IN_TYRE_PRICE_QUOTE',

  GET_APPROVER_IN_TYRE_PRICE_QUOTE: 'GET_APPROVER_IN_TYRE_PRICE_QUOTE',
  LOAD_APPROVER_IN_TYRE_PRICE_QUOTE: 'LOAD_APPROVER_IN_TYRE_PRICE_QUOTE',
  REMOVE_APPROVER_IN_TYRE_PRICE_QUOTE: 'REMOVE_APPROVER_IN_TYRE_PRICE_QUOTE',

  //approve
  APPROVE_TYRE_PRICE_QUOTE: 'APPROVE_TYRE_PRICE_QUOTE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.GET_TYRE_IN_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.GET_SUPPLIER_IN_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.GET_APPROVER_IN_TYRE_PRICE_QUOTE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_TYRE_IN_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_SUPPLIER_IN_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_APPROVER_IN_TYRE_PRICE_QUOTE });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_TYRE_PRICE_QUOTE, payload });
      dispatch({ type: actions.GET_TYRE_IN_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.GET_SUPPLIER_IN_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.GET_APPROVER_IN_TYRE_PRICE_QUOTE });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_TYRE_IN_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_SUPPLIER_IN_TYRE_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_APPROVER_IN_TYRE_PRICE_QUOTE });
    };
  },

  createTyrePriceQuote: payload => ({
    type: actions.INSERT_TYRE_PRICE_QUOTE,
    payload,
  }),
  updateTyrePriceQuote: payload => ({
    type: actions.UPDATE_TYRE_PRICE_QUOTE,
    payload,
  }),
  deleteTyrePriceQuote: tyrePriceQuoteID => ({
    type: actions.DELETE_TYRE_PRICE_QUOTE,
    tyrePriceQuoteID,
  }),
  approveTyrePriceQuote: payload => ({
    type: actions.APPROVE_TYRE_PRICE_QUOTE,
    id: payload.id,
    is_approved: payload.is_approved,
  }),
  setViewedTyrePriceQuote: payload => ({
    type: actions.SET_VIEWED_TYRE_PRICE_QUOTE,
    payload,
  }),
  removeViewedTyrePriceQuote: () => ({
    type: actions.REMOVE_VIEWED_TYRE_PRICE_QUOTE,
  }),
};
export default actions;
