const actions = {
  GET_EQUIPMENT_A_DRIVER_ASSIGNMENT: 'GET_EQUIPMENT_A_DRIVER_ASSIGNMENT',
  CREATE_EQUIPMENT_A_DRIVER_ASSIGNMENT: 'CREATE_EQUIPMENT_A_DRIVER_ASSIGNMENT',
  DELETE_EQUIPMENT_A_DRIVER_ASSIGNMENT: 'DELETE_EQUIPMENT_A_DRIVER_ASSIGNMENT',

  LOAD_EQUIPMENT_A_DRIVER_ASSIGNMENT: 'LOAD_EQUIPMENT_A_DRIVER_ASSIGNMENT',
  REMOVE_EQUIPMENT_A_DRIVER_ASSIGNMENT: 'REMOVE_EQUIPMENT_A_DRIVER_ASSIGNMENT',

  //options
  GET_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT:
    'GET_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT',
  LOAD_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT:
    'LOAD_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT',
  REMOVE_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT:
    'REMOVE_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT',

  GET_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT:
    'GET_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT',
  LOAD_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT:
    'LOAD_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT',
  REMOVE_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT:
    'REMOVE_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT',

  //approve
  APPROVE_EQUIPMENT_A_DRIVER_ASSIGNMENT:
    'APPROVE_EQUIPMENT_A_DRIVER_ASSIGNMENT',

  initData: equipmentId => {
    return dispatch => {
      dispatch({
        type: actions.GET_EQUIPMENT_A_DRIVER_ASSIGNMENT,
        equipmentId,
      });
      dispatch({
        type: actions.GET_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      });
      dispatch({
        type: actions.GET_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      });
    };
  },

  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_EQUIPMENT_A_DRIVER_ASSIGNMENT });
      dispatch({
        type: actions.REMOVE_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      });
      dispatch({
        type: actions.REMOVE_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      });
    };
  },

  createEquipmentADriverAssignment: payload => ({
    type: actions.CREATE_EQUIPMENT_A_DRIVER_ASSIGNMENT,
    payload,
  }),
  deleteEquipmentADriverAssignment: payload => ({
    type: actions.DELETE_EQUIPMENT_A_DRIVER_ASSIGNMENT,
    id: payload.id,
    equipmentId: payload.equipmentId,
  }),

  removeViewedEquipmentADriverAssignment: () => ({
    type: actions.DELETE_EQUIPMENT_A_DRIVER_ASSIGNMENT,
  }),
  //approve
  approveEquipmentADriverAssignment: payload => ({
    type: actions.APPROVE_EQUIPMENT_A_DRIVER_ASSIGNMENT,
    id: payload.id,
    is_approved: payload.is_approved,
    equipmentId: payload.equipmentId,
  }),
};
export default actions;
