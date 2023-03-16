const actions = {
  //serviceRequest
  GET_SERVICE_REQUEST: 'GET_SERVICE_REQUEST',
  INSERT_SERVICE_REQUEST: 'INSERT_SERVICE_REQUEST',
  UPDATE_SERVICE_REQUEST: 'UPDATE_SERVICE_REQUEST',
  DELETE_SERVICE_REQUEST: 'DELETE_SERVICE_REQUEST',

  LOAD_SERVICE_REQUEST: 'LOAD_SERVICE_REQUEST',
  REMOVE_SERVICE_REQUEST: 'REMOVE_SERVICE_REQUEST',

  SET_VIEWED_SERVICE_REQUEST: 'SET_VIEWED_SERVICE_REQUEST',
  UPDATE_VIEWED_SERVICE_REQUEST: 'UPDATE_VIEWED_SERVICE_REQUEST',
  REMOVE_VIEWED_SERVICE_REQUEST: 'REMOVE_VIEWED_SERVICE_REQUEST',

  //get options
  GET_DRIVER_IN_SERVICE_REQUEST: 'GET_DRIVER_IN_SERVICE_REQUEST',
  LOAD_DRIVER_IN_SERVICE_REQUEST: 'LOAD_DRIVER_IN_SERVICE_REQUEST',
  REMOVE_DRIVER_IN_SERVICE_REQUEST: 'REMOVE_DRIVER_IN_SERVICE_REQUEST',

  GET_VEHICLE_IN_SERVICE_REQUEST: 'GET_VEHICLE_IN_SERVICE_REQUEST',
  LOAD_VEHICLE_IN_SERVICE_REQUEST: 'LOAD_VEHICLE_IN_SERVICE_REQUEST',
  REMOVE_VEHICLE_IN_SERVICE_REQUEST: 'REMOVE_VEHICLE_IN_SERVICE_REQUEST',

  GET_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST:
    'GET_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST',
  LOAD_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST:
    'LOAD_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST',
  REMOVE_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST:
    'REMOVE_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST',

  GET_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST:
    'GET_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST',
  LOAD_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST:
    'LOAD_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST',
  REMOVE_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST:
    'REMOVE_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST',

  GET_APPROVER_IN_SERVICE_REQUEST: 'GET_APPROVER_IN_SERVICE_REQUEST',
  LOAD_APPROVER_IN_SERVICE_REQUEST: 'LOAD_APPROVER_IN_SERVICE_REQUEST',
  REMOVE_APPROVER_IN_SERVICE_REQUEST: 'REMOVE_APPROVER_IN_SERVICE_REQUEST',

  //approve
  APPROVE_CONTRACT_IN_SERVICE_REQUEST: 'APPROVE_CONTRACT_IN_SERVICE_REQUEST',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_SERVICE_REQUEST });
      dispatch({ type: actions.GET_DRIVER_IN_SERVICE_REQUEST });
      dispatch({ type: actions.GET_VEHICLE_IN_SERVICE_REQUEST });
      dispatch({
        type: actions.GET_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      });
      dispatch({ type: actions.GET_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST });
      dispatch({ type: actions.GET_APPROVER_IN_SERVICE_REQUEST });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_SERVICE_REQUEST });
      dispatch({ type: actions.REMOVE_DRIVER_IN_SERVICE_REQUEST });
      dispatch({ type: actions.REMOVE_VEHICLE_IN_SERVICE_REQUEST });
      dispatch({
        type: actions.REMOVE_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      });
      dispatch({
        type: actions.REMOVE_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      });
      dispatch({ type: actions.REMOVE_APPROVER_IN_SERVICE_REQUEST });
    };
  },
  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_SERVICE_REQUEST, payload });
      dispatch({ type: actions.GET_DRIVER_IN_SERVICE_REQUEST });
      dispatch({ type: actions.GET_VEHICLE_IN_SERVICE_REQUEST });
      dispatch({
        type: actions.GET_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      });
      dispatch({ type: actions.GET_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST });
      dispatch({ type: actions.GET_APPROVER_IN_SERVICE_REQUEST });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_SERVICE_REQUEST });
      dispatch({ type: actions.REMOVE_DRIVER_IN_SERVICE_REQUEST });
      dispatch({ type: actions.REMOVE_VEHICLE_IN_SERVICE_REQUEST });
      dispatch({
        type: actions.REMOVE_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      });
      dispatch({
        type: actions.REMOVE_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      });
      dispatch({ type: actions.REMOVE_APPROVER_IN_SERVICE_REQUEST });
    };
  },

  createServiceRequest: payload => ({
    type: actions.INSERT_SERVICE_REQUEST,
    payload,
  }),
  updateServiceRequest: payload => ({
    type: actions.UPDATE_SERVICE_REQUEST,
    payload,
  }),
  deleteServiceRequest: serviceRequestID => ({
    type: actions.DELETE_SERVICE_REQUEST,
    serviceRequestID,
  }),
  setViewedServiceRequest: payload => ({
    type: actions.SET_VIEWED_SERVICE_REQUEST,
    payload,
  }),
  removeViewedServiceRequest: () => ({
    type: actions.REMOVE_VIEWED_SERVICE_REQUEST,
  }),
  approveContract: payload => ({
    type: actions.APPROVE_CONTRACT_IN_SERVICE_REQUEST,
    id: payload.id,
    is_approved: payload.is_approved,
  }),
};
export default actions;
