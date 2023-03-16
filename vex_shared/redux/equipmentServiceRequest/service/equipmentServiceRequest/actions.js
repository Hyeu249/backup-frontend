const actions = {
  //equipmentServiceRequest
  GET_EQUIPMENT_SERVICE_REQUEST: 'GET_EQUIPMENT_SERVICE_REQUEST',
  INSERT_EQUIPMENT_SERVICE_REQUEST: 'INSERT_EQUIPMENT_SERVICE_REQUEST',
  UPDATE_EQUIPMENT_SERVICE_REQUEST: 'UPDATE_EQUIPMENT_SERVICE_REQUEST',
  DELETE_EQUIPMENT_SERVICE_REQUEST: 'DELETE_EQUIPMENT_SERVICE_REQUEST',

  LOAD_EQUIPMENT_SERVICE_REQUEST: 'LOAD_EQUIPMENT_SERVICE_REQUEST',
  REMOVE_EQUIPMENT_SERVICE_REQUEST: 'REMOVE_EQUIPMENT_SERVICE_REQUEST',

  SET_VIEWED_EQUIPMENT_SERVICE_REQUEST: 'SET_VIEWED_EQUIPMENT_SERVICE_REQUEST',
  UPDATE_VIEWED_EQUIPMENT_SERVICE_REQUEST:
    'UPDATE_VIEWED_EQUIPMENT_SERVICE_REQUEST',
  REMOVE_VIEWED_EQUIPMENT_SERVICE_REQUEST:
    'REMOVE_VIEWED_EQUIPMENT_SERVICE_REQUEST',

  //get options
  GET_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST:
    'GET_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST',
  LOAD_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST:
    'LOAD_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST',
  REMOVE_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST:
    'REMOVE_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_EQUIPMENT_SERVICE_REQUEST });
      dispatch({
        type: actions.GET_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST,
      });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_EQUIPMENT_SERVICE_REQUEST });
      dispatch({
        type: actions.REMOVE_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST,
      });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_EQUIPMENT_SERVICE_REQUEST, payload });
      dispatch({
        type: actions.GET_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST,
      });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_EQUIPMENT_SERVICE_REQUEST });
      dispatch({
        type: actions.REMOVE_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST,
      });
    };
  },

  createEquipmentServiceRequest: payload => ({
    type: actions.INSERT_EQUIPMENT_SERVICE_REQUEST,
    payload,
  }),
  updateEquipmentServiceRequest: payload => ({
    type: actions.UPDATE_EQUIPMENT_SERVICE_REQUEST,
    payload,
  }),
  deleteEquipmentServiceRequest: equipmentServiceRequestID => ({
    type: actions.DELETE_EQUIPMENT_SERVICE_REQUEST,
    equipmentServiceRequestID,
  }),
  //VIEWED
  setViewedEquipmentServiceRequest: payload => ({
    type: actions.SET_VIEWED_EQUIPMENT_SERVICE_REQUEST,
    payload,
  }),
  removeViewedEquipmentServiceRequest: () => ({
    type: actions.REMOVE_VIEWED_EQUIPMENT_SERVICE_REQUEST,
  }),
};
export default actions;
