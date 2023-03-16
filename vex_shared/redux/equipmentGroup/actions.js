const actions = {
  INSERT_EQUIPMENT_GROUP: 'INSERT_EQUIPMENT_GROUP',
  GET_EQUIPMENT_GROUP: 'GET_EQUIPMENT_GROUP',
  UPDATE_EQUIPMENT_GROUP: 'UPDATE_EQUIPMENT_GROUP',
  DELETE_EQUIPMENT_GROUP: 'DELETE_EQUIPMENT_GROUP',

  LOAD_EQUIPMENT_GROUP: 'LOAD_EQUIPMENT_GROUP',
  REMOVE_EQUIPMENT_GROUP: 'REMOVE_EQUIPMENT_GROUP',

  SET_VIEWED_EQUIPMENT_GROUP: 'SET_VIEWED_EQUIPMENT_GROUP',
  UPDATE_VIEWED_EQUIPMENT_GROUP: 'UPDATE_VIEWED_EQUIPMENT_GROUP',
  REMOVE_VIEWED_EQUIPMENT_GROUP: 'REMOVE_VIEWED_EQUIPMENT_GROUP',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_EQUIPMENT_GROUP });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_EQUIPMENT_GROUP });
    };
  },

  createEquipmentGroup: payload => ({
    type: actions.INSERT_EQUIPMENT_GROUP,
    payload,
  }),
  updateEquipmentGroup: payload => ({
    type: actions.UPDATE_EQUIPMENT_GROUP,
    payload,
  }),
  deleteEquipmentGroup: equipmentGroupID => ({
    type: actions.DELETE_EQUIPMENT_GROUP,
    equipmentGroupID,
  }),
  setViewedEquipmentGroup: payload => ({
    type: actions.SET_VIEWED_EQUIPMENT_GROUP,
    payload,
  }),
  removeViewedEquipmentGroup: () => ({
    type: actions.REMOVE_VIEWED_EQUIPMENT_GROUP,
  }),
};

export default actions;
