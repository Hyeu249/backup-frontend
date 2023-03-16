const actions = {
  //assign tyre
  GET_VEHICLE_IN_TYRE: 'GET_VEHICLE_IN_TYRE',
  LOAD_VEHICLE_IN_TYRE: 'LOAD_VEHICLE_IN_TYRE',
  REMOVE_VEHICLE_IN_TYRE: 'REMOVE_VEHICLE_IN_TYRE',

  ASSIGN_TYRE_TO_VEHICLE: 'ASSIGN_TYRE_TO_VEHICLE',
  GET_VEHICLE_ASSIGNMENT_IN_TYRE: 'GET_VEHICLE_ASSIGNMENT_IN_TYRE',
  UPDATE_VEHICLE_ASSIGNMENT_IN_TYRE: 'UPDATE_VEHICLE_ASSIGNMENT_IN_TYRE',
  DELETE_VEHICLE_ASSIGNMENT_IN_TYRE: 'DELETE_VEHICLE_ASSIGNMENT_IN_TYRE',

  LOAD_VEHICLE_ASSIGNMENT_IN_TYRE: 'LOAD_VEHICLE_ASSIGNMENT_IN_TYRE',
  REMOVE_VEHICLE_ASSIGNMENT_IN_TYRE: 'REMOVE_VEHICLE_ASSIGNMENT_IN_TYRE',

  SET_VIEWED_TYRE_VEHICLE_ASSIGNMENT: 'SET_VIEWED_TYRE_VEHICLE_ASSIGNMENT',
  UPDATE_VIEWED_TYRE_VEHICLE_ASSIGNMENT:
    'UPDATE_VIEWED_TYRE_VEHICLE_ASSIGNMENT',
  REMOVE_VIEWED_TYRE_VEHICLE_ASSIGNMENT:
    'REMOVE_VIEWED_TYRE_VEHICLE_ASSIGNMENT',
  APPROVE_VEHICLE_TYRE_RELATION: 'APPROVE_VEHICLE_TYRE_RELATION',

  //assignment
  initVehicleInTyre: () => {
    return dispatch => {
      dispatch({ type: actions.GET_VEHICLE_IN_TYRE });
    };
  },
  initVehicleAssignmentInTyre: tyreId => ({
    type: actions.GET_VEHICLE_ASSIGNMENT_IN_TYRE,
    tyreId,
  }),
  removeVehiclesInTyre: () => ({
    type: actions.REMOVE_VEHICLE_IN_TYRE,
  }),
  removeVehicleAssignmentInTyre: () => ({
    type: actions.REMOVE_VEHICLE_ASSIGNMENT_IN_TYRE,
  }),

  createAssignTyre: payload => ({
    type: actions.ASSIGN_TYRE_TO_VEHICLE,
    payload,
  }),
  updateAssignment: payload => ({
    type: actions.UPDATE_VEHICLE_ASSIGNMENT_IN_TYRE,
    payload,
  }),
  deleteAssignment: id => ({
    type: actions.DELETE_VEHICLE_ASSIGNMENT_IN_TYRE,
    id,
  }),

  setViewedAssignment: payload => ({
    type: actions.SET_VIEWED_TYRE_VEHICLE_ASSIGNMENT,
    payload,
  }),

  removeViewedAssignment: () => ({
    type: actions.REMOVE_VIEWED_TYRE_VEHICLE_ASSIGNMENT,
  }),
  approveVehicleTyreAssignment: id => ({
    type: actions.APPROVE_VEHICLE_TYRE_RELATION,
    id,
  }),
};
export default actions;
