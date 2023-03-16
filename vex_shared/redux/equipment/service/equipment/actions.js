const actions = {
  //equipment
  GET_EQUIPMENT: 'GET_EQUIPMENT',
  INSERT_EQUIPMENT: 'INSERT_EQUIPMENT',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  DELETE_EQUIPMENT: 'DELETE_EQUIPMENT',

  LOAD_EQUIPMENT: 'LOAD_EQUIPMENT',
  REMOVE_EQUIPMENT: 'REMOVE_EQUIPMENT',

  SET_VIEWED_EQUIPMENT: 'SET_VIEWED_EQUIPMENT',
  UPDATE_VIEWED_EQUIPMENT: 'UPDATE_VIEWED_EQUIPMENT',
  REMOVE_VIEWED_EQUIPMENT: 'REMOVE_VIEWED_EQUIPMENT',

  GET_MAINTENANCE_TYPE_IN_EQUIPMENT: 'GET_MAINTENANCE_TYPE_IN_EQUIPMENT',
  LOAD_MAINTENANCE_TYPE_IN_EQUIPMENT: 'LOAD_MAINTENANCE_TYPE_IN_EQUIPMENT',
  REMOVE_MAINTENANCE_TYPE_IN_EQUIPMENT: 'REMOVE_MAINTENANCE_TYPE_IN_EQUIPMENT',

  GET_EQUIPMENT_GROUP_IN_EQUIPMENT: 'GET_EQUIPMENT_GROUP_IN_EQUIPMENT',
  LOAD_EQUIPMENT_GROUP_IN_EQUIPMENT: 'LOAD_EQUIPMENT_GROUP_IN_EQUIPMENT',
  REMOVE_EQUIPMENT_GROUP_IN_EQUIPMENT: 'REMOVE_EQUIPMENT_GROUP_IN_EQUIPMENT',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_EQUIPMENT });
      dispatch({ type: actions.GET_MAINTENANCE_TYPE_IN_EQUIPMENT });
      dispatch({ type: actions.GET_EQUIPMENT_GROUP_IN_EQUIPMENT });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_EQUIPMENT });
      dispatch({ type: actions.REMOVE_MAINTENANCE_TYPE_IN_EQUIPMENT });
      dispatch({ type: actions.REMOVE_EQUIPMENT_GROUP_IN_EQUIPMENT });
    };
  },
  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_EQUIPMENT, payload });
      dispatch({ type: actions.GET_MAINTENANCE_TYPE_IN_EQUIPMENT });
      dispatch({ type: actions.GET_EQUIPMENT_GROUP_IN_EQUIPMENT });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_EQUIPMENT });
      dispatch({ type: actions.REMOVE_MAINTENANCE_TYPE_IN_EQUIPMENT });
      dispatch({ type: actions.REMOVE_EQUIPMENT_GROUP_IN_EQUIPMENT });
    };
  },

  createEquipment: payload => ({ type: actions.INSERT_EQUIPMENT, payload }),
  updateEquipment: payload => ({ type: actions.UPDATE_EQUIPMENT, payload }),
  deleteEquipment: equipmentID => ({
    type: actions.DELETE_EQUIPMENT,
    equipmentID,
  }),

  setViewedEquipment: payload => ({
    type: actions.SET_VIEWED_EQUIPMENT,
    payload,
  }),
  removeViewedEquipment: () => ({ type: actions.REMOVE_VIEWED_EQUIPMENT }),
};
export default actions;
