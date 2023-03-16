const actions = {
  GET_EQUIPMENT_A_VEHICLE_ASSIGNMENT: 'GET_EQUIPMENT_A_VEHICLE_ASSIGNMENT',
  CREATE_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'CREATE_EQUIPMENT_A_VEHICLE_ASSIGNMENT',
  DELETE_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'DELETE_EQUIPMENT_A_VEHICLE_ASSIGNMENT',

  LOAD_EQUIPMENT_A_VEHICLE_ASSIGNMENT: 'LOAD_EQUIPMENT_A_VEHICLE_ASSIGNMENT',
  REMOVE_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'REMOVE_EQUIPMENT_A_VEHICLE_ASSIGNMENT',

  //options
  GET_VEHICLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'GET_VEHICLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT',
  LOAD_VEIHCLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'LOAD_VEIHCLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT',
  REMOVE_VEHICLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'REMOVE_VEHICLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT',

  GET_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'GET_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT',
  LOAD_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'LOAD_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT',
  REMOVE_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'REMOVE_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT',

  //approve
  APPROVE_EQUIPMENT_A_VEHICLE_ASSIGNMENT:
    'APPROVE_EQUIPMENT_A_VEHICLE_ASSIGNMENT',

  initData: equipmentId => {
    return dispatch => {
      dispatch({
        type: actions.GET_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
        equipmentId,
      });
      dispatch({
        type: actions.GET_VEHICLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      });
      dispatch({
        type: actions.GET_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      });
    };
  },

  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_EQUIPMENT_A_VEHICLE_ASSIGNMENT });
      dispatch({
        type: actions.REMOVE_VEHICLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      });
      dispatch({
        type: actions.REMOVE_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      });
    };
  },

  createEquipmentAVehicleAssignment: payload => ({
    type: actions.CREATE_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
    payload,
  }),
  deleteEquipmentAVehicleAssignment: payload => ({
    type: actions.DELETE_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
    id: payload.id,
    equipmentId: payload.equipmentId,
  }),

  removeViewedEquipmentAVehicleAssignment: () => ({
    type: actions.DELETE_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
  }),
  //approve
  approveEquipmentAVehicleAssignment: payload => ({
    type: actions.APPROVE_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
    id: payload.id,
    is_approved: payload.is_approved,
    equipmentId: payload.equipmentId,
  }),
};
export default actions;
