const actions = {
  //fuelPriceQuote
  GET_FUEL_PRICE_QUOTE: 'GET_FUEL_PRICE_QUOTE',
  INSERT_FUEL_PRICE_QUOTE: 'INSERT_FUEL_PRICE_QUOTE',
  UPDATE_FUEL_PRICE_QUOTE: 'UPDATE_FUEL_PRICE_QUOTE',
  DELETE_FUEL_PRICE_QUOTE: 'DELETE_FUEL_PRICE_QUOTE',

  LOAD_FUEL_PRICE_QUOTE: 'LOAD_FUEL_PRICE_QUOTE',
  REMOVE_FUEL_PRICE_QUOTE: 'REMOVE_FUEL_PRICE_QUOTE',

  SET_VIEWED_FUEL_PRICE_QUOTE: 'SET_VIEWED_FUEL_PRICE_QUOTE',
  UPDATE_VIEWED_FUEL_PRICE_QUOTE: 'UPDATE_VIEWED_FUEL_PRICE_QUOTE',
  REMOVE_VIEWED_FUEL_PRICE_QUOTE: 'REMOVE_VIEWED_FUEL_PRICE_QUOTE',

  //OPTIONS
  GET_FUEL_IN_FUEL_PRICE_QUOTE: 'GET_FUEL_IN_FUEL_PRICE_QUOTE',
  LOAD_FUEL_IN_FUEL_PRICE_QUOTE: 'LOAD_FUEL_IN_FUEL_PRICE_QUOTE',
  REMOVE_FUEL_IN_FUEL_PRICE_QUOTE: 'REMOVE_FUEL_IN_FUEL_PRICE_QUOTE',

  GET_SUPPLIER_IN_FUEL_PRICE_QUOTE: 'GET_SUPPLIER_IN_FUEL_PRICE_QUOTE',
  LOAD_SUPPLIER_IN_FUEL_PRICE_QUOTE: 'LOAD_SUPPLIER_IN_FUEL_PRICE_QUOTE',
  REMOVE_SUPPLIER_IN_FUEL_PRICE_QUOTE: 'REMOVE_SUPPLIER_IN_FUEL_PRICE_QUOTE',

  GET_APPROVER_IN_FUEL_PRICE_QUOTE: 'GET_APPROVER_IN_FUEL_PRICE_QUOTE',
  LOAD_APPROVER_IN_FUEL_PRICE_QUOTE: 'LOAD_APPROVER_IN_FUEL_PRICE_QUOTE',
  REMOVE_APPROVER_IN_FUEL_PRICE_QUOTE: 'REMOVE_APPROVER_IN_FUEL_PRICE_QUOTE',

  //approve
  APPROVE_FUEL_PRICE_QUOTE: 'APPROVE_FUEL_PRICE_QUOTE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.GET_FUEL_IN_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.GET_SUPPLIER_IN_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.GET_APPROVER_IN_FUEL_PRICE_QUOTE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_FUEL_IN_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_SUPPLIER_IN_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_APPROVER_IN_FUEL_PRICE_QUOTE });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_FUEL_PRICE_QUOTE, payload });
      dispatch({ type: actions.GET_FUEL_IN_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.GET_SUPPLIER_IN_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.GET_APPROVER_IN_FUEL_PRICE_QUOTE });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_FUEL_IN_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_SUPPLIER_IN_FUEL_PRICE_QUOTE });
      dispatch({ type: actions.REMOVE_APPROVER_IN_FUEL_PRICE_QUOTE });
    };
  },

  createFuelPriceQuote: payload => ({
    type: actions.INSERT_FUEL_PRICE_QUOTE,
    payload,
  }),
  updateFuelPriceQuote: payload => ({
    type: actions.UPDATE_FUEL_PRICE_QUOTE,
    payload,
  }),
  deleteFuelPriceQuote: fuelPriceQuoteID => ({
    type: actions.DELETE_FUEL_PRICE_QUOTE,
    fuelPriceQuoteID,
  }),
  approveFuelPriceQuote: payload => ({
    type: actions.APPROVE_FUEL_PRICE_QUOTE,
    id: payload.id,
    is_approved: payload.is_approved,
  }),

  setViewedFuelPriceQuote: payload => ({
    type: actions.SET_VIEWED_FUEL_PRICE_QUOTE,
    payload,
  }),
  removeViewedFuelPriceQuote: () => ({
    type: actions.REMOVE_VIEWED_FUEL_PRICE_QUOTE,
  }),
};
export default actions;
