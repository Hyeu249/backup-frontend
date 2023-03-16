const actions = {
  //supplier
  GET_SUPPLIER: 'GET_SUPPLIER',
  INSERT_SUPPLIER: 'INSERT_SUPPLIER',
  UPDATE_SUPPLIER: 'UPDATE_SUPPLIER',
  DELETE_SUPPLIER: 'DELETE_SUPPLIER',

  LOAD_SUPPLIER: 'LOAD_SUPPLIER',
  REMOVE_SUPPLIER: 'REMOVE_SUPPLIER',

  SET_VIEWED_SUPPLIER: 'SET_VIEWED_SUPPLIER',
  UPDATE_VIEWED_SUPPLIER: 'UPDATE_VIEWED_SUPPLIER',
  REMOVE_VIEWED_SUPPLIER: 'REMOVE_VIEWED_SUPPLIER',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_SUPPLIER });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_SUPPLIER });
    };
  },
  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_SUPPLIER, payload });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_SUPPLIER });
    };
  },

  createSupplier: payload => ({ type: actions.INSERT_SUPPLIER, payload }),
  updateSupplier: payload => ({ type: actions.UPDATE_SUPPLIER, payload }),
  deleteSupplier: supplierID => ({
    type: actions.DELETE_SUPPLIER,
    supplierID,
  }),

  setViewedSupplier: payload => ({
    type: actions.SET_VIEWED_SUPPLIER,
    payload,
  }),
  removeViewedSupplier: () => ({ type: actions.REMOVE_VIEWED_SUPPLIER }),
};
export default actions;
