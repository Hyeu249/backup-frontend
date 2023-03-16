const actions = {
  //supplierQuote
  GET_SUPPLIER_QUOTE: 'GET_SUPPLIER_QUOTE',
  INSERT_SUPPLIER_QUOTE: 'INSERT_SUPPLIER_QUOTE',
  UPDATE_SUPPLIER_QUOTE: 'UPDATE_SUPPLIER_QUOTE',
  DELETE_SUPPLIER_QUOTE: 'DELETE_SUPPLIER_QUOTE',

  LOAD_SUPPLIER_QUOTE: 'LOAD_SUPPLIER_QUOTE',
  REMOVE_SUPPLIER_QUOTE: 'REMOVE_SUPPLIER_QUOTE',

  SET_VIEWED_SUPPLIER_QUOTE: 'SET_VIEWED_SUPPLIER_QUOTE',
  UPDATE_VIEWED_SUPPLIER_QUOTE: 'UPDATE_VIEWED_SUPPLIER_QUOTE',
  REMOVE_VIEWED_SUPPLIER_QUOTE: 'REMOVE_VIEWED_SUPPLIER_QUOTE',

  //options
  GET_SUPPLIER_IN_SUPPLIER_QUOTE: 'GET_SUPPLIER_IN_SUPPLIER_QUOTE',
  LOAD_SUPPLIER_IN_SUPPLIER_QUOTE: 'LOAD_SUPPLIER_IN_SUPPLIER_QUOTE',
  REMOVE_SUPPLIER_IN_SUPPLIER_QUOTE: 'REMOVE_SUPPLIER_IN_SUPPLIER_QUOTE',

  GET_EQUIPMENT_IN_SUPPLIER_QUOTE: 'GET_EQUIPMENT_IN_SUPPLIER_QUOTE',
  LOAD_EQUIPMENT_IN_SUPPLIER_QUOTE: 'LOAD_EQUIPMENT_IN_SUPPLIER_QUOTE',
  REMOVE_EQUIPMENT_IN_SUPPLIER_QUOTE: 'REMOVE_EQUIPMENT_IN_SUPPLIER_QUOTE',

  GET_SERVICE_TYPE_IN_SUPPLIER_QUOTE: 'GET_SERVICE_TYPE_IN_SUPPLIER_QUOTE',
  LOAD_SERVICE_TYPE_IN_SUPPLIER_QUOTE: 'LOAD_SERVICE_TYPE_IN_SUPPLIER_QUOTE',
  REMOVE_SERVICE_TYPE_IN_SUPPLIER_QUOTE:
    'REMOVE_SERVICE_TYPE_IN_SUPPLIER_QUOTE',

  GET_APPROVER_IN_SUPPLIER_QUOTE: 'GET_APPROVER_IN_SUPPLIER_QUOTE',
  LOAD_APPROVER_IN_SUPPLIER_QUOTE: 'LOAD_APPROVER_IN_SUPPLIER_QUOTE',
  REMOVE_APPROVER_IN_SUPPLIER_QUOTE: 'REMOVE_APPROVER_IN_SUPPLIER_QUOTE',

  //approve
  APPROVE_SUPPLIER_QUOTE: 'APPROVE_SUPPLIER_QUOTE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_SUPPLIER_QUOTE });
      dispatch({ type: actions.GET_SUPPLIER_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.GET_EQUIPMENT_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.GET_SERVICE_TYPE_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.GET_APPROVER_IN_SUPPLIER_QUOTE });
    };
  },

  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_SUPPLIER_QUOTE });
      dispatch({ type: actions.REMOVE_SUPPLIER_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.REMOVE_EQUIPMENT_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.REMOVE_SERVICE_TYPE_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.REMOVE_APPROVER_IN_SUPPLIER_QUOTE });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_SUPPLIER_QUOTE, payload });
      dispatch({ type: actions.GET_SUPPLIER_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.GET_EQUIPMENT_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.GET_SERVICE_TYPE_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.GET_APPROVER_IN_SUPPLIER_QUOTE });
    };
  },

  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_SUPPLIER_QUOTE });
      dispatch({ type: actions.REMOVE_SUPPLIER_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.REMOVE_EQUIPMENT_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.REMOVE_SERVICE_TYPE_IN_SUPPLIER_QUOTE });
      dispatch({ type: actions.REMOVE_APPROVER_IN_SUPPLIER_QUOTE });
    };
  },

  createSupplierQuote: payload => ({
    type: actions.INSERT_SUPPLIER_QUOTE,
    payload,
  }),
  updateSupplierQuote: payload => ({
    type: actions.UPDATE_SUPPLIER_QUOTE,
    payload,
  }),
  deleteSupplierQuote: supplierQuoteID => ({
    type: actions.DELETE_SUPPLIER_QUOTE,
    supplierQuoteID,
  }),
  approveSupplierQuote: payload => ({
    type: actions.APPROVE_SUPPLIER_QUOTE,
    id: payload.id,
    is_approved: payload.is_approved,
  }),
  setViewedSupplierQuote: payload => ({
    type: actions.SET_VIEWED_SUPPLIER_QUOTE,
    payload,
  }),
  removeViewedSupplierQuote: () => ({
    type: actions.REMOVE_VIEWED_SUPPLIER_QUOTE,
  }),
};
export default actions;
