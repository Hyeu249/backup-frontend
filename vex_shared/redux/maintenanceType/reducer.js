import actions from './actions';

const initState = {
  maintenanceTypes: [],
  viewedMaintenanceType: {},
};

export default function maintenanceTypeReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    case actions.LOAD_MAINTENANCE_TYPE: {
      return {
        ...state,
        maintenanceTypes: action.maintenanceTypes,
      };
    }
    case actions.REMOVE_MAINTENANCE_TYPE: {
      return {
        ...state,
        maintenanceTypes: [],
      };
    }
    case actions.UPDATE_VIEWED_MAINTENANCE_TYPE: {
      return {
        ...state,
        viewedMaintenanceType: { ...action.viewedMaintenanceType },
      };
    }
    case actions.REMOVE_VIEWED_MAINTENANCE_TYPE: {
      return {
        ...state,
        viewedMaintenanceType: {},
      };
    }
    default:
      return state;
  }
}
