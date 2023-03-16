const actions = {
  //contract
  GET_CONTRACT: 'GET_CONTRACT',
  INSERT_CONTRACT: 'INSERT_CONTRACT',
  UPDATE_CONTRACT: 'UPDATE_CONTRACT',
  DELETE_CONTRACT: 'DELETE_CONTRACT',

  LOAD_CONTRACT: 'LOAD_CONTRACT',
  REMOVE_CONTRACT: 'REMOVE_CONTRACT',

  SET_VIEWED_CONTRACT: 'SET_VIEWED_CONTRACT',
  UPDATE_VIEWED_CONTRACT: 'UPDATE_VIEWED_CONTRACT',
  REMOVE_VIEWED_CONTRACT: 'REMOVE_VIEWED_CONTRACT',

  //options
  GET_SUPPLIER_IN_CONTRACT: 'GET_SUPPLIER_IN_CONTRACT',
  LOAD_SUPPLIER_IN_CONTRACT: 'LOAD_SUPPLIER_IN_CONTRACT',
  REMOVE_SUPPLIER_IN_CONTRACT: 'REMOVE_SUPPLIER_IN_CONTRACT',

  GET_APPROVER_IN_CONTRACT: 'GET_APPROVER_IN_CONTRACT',
  LOAD_APPROVER_IN_CONTRACT: 'LOAD_APPROVER_IN_CONTRACT',
  REMOVE_APPROVER_IN_CONTRACT: 'REMOVE_APPROVER_IN_CONTRACT',

  //approve
  APPROVE_CONTRACT: 'APPROVE_CONTRACT',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_CONTRACT });
      dispatch({ type: actions.GET_SUPPLIER_IN_CONTRACT });
      dispatch({ type: actions.GET_APPROVER_IN_CONTRACT });
    };
  },

  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_CONTRACT });
      dispatch({ type: actions.REMOVE_SUPPLIER_IN_CONTRACT });
      dispatch({ type: actions.REMOVE_APPROVER_IN_CONTRACT });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_CONTRACT, payload });
      dispatch({ type: actions.GET_SUPPLIER_IN_CONTRACT });
      dispatch({ type: actions.GET_APPROVER_IN_CONTRACT });
    };
  },

  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_CONTRACT });
      dispatch({ type: actions.REMOVE_SUPPLIER_IN_CONTRACT });
      dispatch({ type: actions.REMOVE_APPROVER_IN_CONTRACT });
    };
  },

  createContract: payload => ({ type: actions.INSERT_CONTRACT, payload }),
  updateContract: payload => ({ type: actions.UPDATE_CONTRACT, payload }),
  deleteContract: contractID => ({
    type: actions.DELETE_CONTRACT,
    contractID,
  }),
  approveContract: payload => ({
    type: actions.APPROVE_CONTRACT,
    id: payload.id,
    is_approved: payload.is_approved,
  }),

  setViewedContract: payload => ({
    type: actions.SET_VIEWED_CONTRACT,
    payload,
  }),
  removeViewedContract: () => ({ type: actions.REMOVE_VIEWED_CONTRACT }),
};
export default actions;
