const actions = {
  //fuelRequest
  GET_FUEL_REQUEST: 'GET_FUEL_REQUEST',
  INSERT_FUEL_REQUEST: 'INSERT_FUEL_REQUEST',
  UPDATE_FUEL_REQUEST: 'UPDATE_FUEL_REQUEST',
  DELETE_FUEL_REQUEST: 'DELETE_FUEL_REQUEST',

  LOAD_FUEL_REQUEST: 'LOAD_FUEL_REQUEST',
  REMOVE_FUEL_REQUEST: 'REMOVE_FUEL_REQUEST',

  SET_VIEWED_FUEL_REQUEST: 'SET_VIEWED_FUEL_REQUEST',
  UPDATE_VIEWED_FUEL_REQUEST: 'UPDATE_VIEWED_FUEL_REQUEST',
  REMOVE_VIEWED_FUEL_REQUEST: 'REMOVE_VIEWED_FUEL_REQUEST',

  //get options
  GET_VEHICLE_IN_FUEL_REQUEST: 'GET_VEHICLE_IN_FUEL_REQUEST',
  LOAD_VEHICLE_IN_FUEL_REQUEST: 'LOAD_VEHICLE_IN_FUEL_REQUEST',
  REMOVE_VEHICLE_IN_FUEL_REQUEST: 'REMOVE_VEHICLE_IN_FUEL_REQUEST',

  GET_DRIVER_IN_FUEL_REQUEST: 'GET_DRIVER_IN_FUEL_REQUEST',
  LOAD_DRIVER_IN_FUEL_REQUEST: 'LOAD_DRIVER_IN_FUEL_REQUEST',
  REMOVE_DRIVER_IN_FUEL_REQUEST: 'REMOVE_DRIVER_IN_FUEL_REQUEST',

  GET_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST: 'GET_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST',
  LOAD_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST:
    'LOAD_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST',
  REMOVE_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST:
    'REMOVE_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST',

  GET_APPROVER_IN_FUEL_REQUEST: 'GET_APPROVER_IN_FUEL_REQUEST',
  LOAD_APPROVER_IN_FUEL_REQUEST: 'LOAD_APPROVER_IN_FUEL_REQUEST',
  REMOVE_APPROVER_IN_FUEL_REQUEST: 'REMOVE_APPROVER_IN_FUEL_REQUEST',

  //approve
  APPROVE_FUEL_REQUEST: 'APPROVE_FUEL_REQUEST',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_FUEL_REQUEST });
      dispatch({ type: actions.GET_VEHICLE_IN_FUEL_REQUEST });
      dispatch({ type: actions.GET_DRIVER_IN_FUEL_REQUEST });
      dispatch({ type: actions.GET_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST });
      dispatch({ type: actions.GET_APPROVER_IN_FUEL_REQUEST });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_FUEL_REQUEST });
      dispatch({ type: actions.REMOVE_VEHICLE_IN_FUEL_REQUEST });
      dispatch({ type: actions.REMOVE_DRIVER_IN_FUEL_REQUEST });
      dispatch({ type: actions.REMOVE_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST });
      dispatch({ type: actions.REMOVE_APPROVER_IN_FUEL_REQUEST });
    };
  },

  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_FUEL_REQUEST, payload });
      dispatch({ type: actions.GET_VEHICLE_IN_FUEL_REQUEST });
      dispatch({ type: actions.GET_DRIVER_IN_FUEL_REQUEST });
      dispatch({ type: actions.GET_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST });
      dispatch({ type: actions.GET_APPROVER_IN_FUEL_REQUEST });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_FUEL_REQUEST });
      dispatch({ type: actions.REMOVE_VEHICLE_IN_FUEL_REQUEST });
      dispatch({ type: actions.REMOVE_DRIVER_IN_FUEL_REQUEST });
      dispatch({ type: actions.REMOVE_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST });
      dispatch({ type: actions.REMOVE_APPROVER_IN_FUEL_REQUEST });
    };
  },

  createFuelRequest: payload => ({
    type: actions.INSERT_FUEL_REQUEST,
    payload,
  }),
  updateFuelRequest: payload => ({
    type: actions.UPDATE_FUEL_REQUEST,
    payload,
  }),
  deleteFuelRequest: fuelRequestID => ({
    type: actions.DELETE_FUEL_REQUEST,
    fuelRequestID,
  }),
  approveFuelRequest: payload => ({
    type: actions.APPROVE_FUEL_REQUEST,
    id: payload.id,
    is_approved: payload.is_approved,
  }),

  setViewedFuelRequest: payload => ({
    type: actions.SET_VIEWED_FUEL_REQUEST,
    payload,
  }),
  removeViewedFuelRequest: () => ({ type: actions.REMOVE_VIEWED_FUEL_REQUEST }),
};
export default actions;
