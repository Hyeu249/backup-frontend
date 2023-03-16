const actions = {
  INSERT_MAINTENANCE_TYPE: 'INSERT_MAINTENANCE_TYPE',
  GET_MAINTENANCE_TYPE: 'GET_MAINTENANCE_TYPE',
  UPDATE_MAINTENANCE_TYPE: 'UPDATE_MAINTENANCE_TYPE',
  DELETE_MAINTENANCE_TYPE: 'DELETE_MAINTENANCE_TYPE',

  LOAD_MAINTENANCE_TYPE: 'LOAD_MAINTENANCE_TYPE',
  REMOVE_MAINTENANCE_TYPE: 'REMOVE_MAINTENANCE_TYPE',

  SET_VIEWED_MAINTENANCE_TYPE: 'SET_VIEWED_MAINTENANCE_TYPE',
  UPDATE_VIEWED_MAINTENANCE_TYPE: 'UPDATE_VIEWED_MAINTENANCE_TYPE',
  REMOVE_VIEWED_MAINTENANCE_TYPE: 'REMOVE_VIEWED_MAINTENANCE_TYPE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_MAINTENANCE_TYPE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_MAINTENANCE_TYPE });
    };
  },

  createMaintenanceType: payload => ({
    type: actions.INSERT_MAINTENANCE_TYPE,
    payload,
  }),
  updateMaintenanceType: payload => ({
    type: actions.UPDATE_MAINTENANCE_TYPE,
    payload,
  }),
  deleteMaintenanceType: maintenanceTypeID => ({
    type: actions.DELETE_MAINTENANCE_TYPE,
    maintenanceTypeID,
  }),
  setViewedMaintenanceType: payload => ({
    type: actions.SET_VIEWED_MAINTENANCE_TYPE,
    payload,
  }),
  removeViewedMaintenanceType: () => ({
    type: actions.REMOVE_VIEWED_MAINTENANCE_TYPE,
  }),
};

export default actions;
