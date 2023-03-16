import actions from './actions';

const initState = {
  vehicleTypes: [],
  viewedVehicleType: {},
  depositTypes: [],
};

export default function vehicleTypeReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    case actions.LOAD_VEHICLE_TYPE: {
      return {
        ...state,
        vehicleTypes: action.vehicleTypes,
      };
    }
    case actions.REMOVE_VEHICLE_TYPE: {
      return {
        ...state,
        vehicleTypes: [],
      };
    }
    case actions.UPDATE_VIEWED_VEHICLE_TYPE: {
      return {
        ...state,
        viewedVehicleType: { ...action.viewedVehicleType },
      };
    }
    case actions.REMOVE_VIEWED_VEHICLE_TYPE: {
      return {
        ...state,
        viewedVehicleType: {},
      };
    }
    default:
      return state;
  }
}
