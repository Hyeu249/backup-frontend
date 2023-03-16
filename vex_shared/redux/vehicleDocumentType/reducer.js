import actions from './actions';

const initState = {
  vehicleDocumentTypes: [],
  viewedVehicleDocumentType: {},
};

export default function vehicleDocumentTypeReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    case actions.LOAD_VEHICLE_DOCUMENT_TYPE: {
      return {
        ...state,
        vehicleDocumentTypes: action.vehicleDocumentTypes,
      };
    }
    case actions.REMOVE_VEHICLE_DOCUMENT_TYPE: {
      return {
        ...state,
        vehicleDocumentTypes: [],
      };
    }
    case actions.UPDATE_VIEWED_VEHICLE_DOCUMENT_TYPE: {
      return {
        ...state,
        viewedVehicleDocumentType: { ...action.viewedVehicleDocumentType },
      };
    }
    case actions.REMOVE_VIEWED_VEHICLE_DOCUMENT_TYPE: {
      return {
        ...state,
        viewedVehicleDocumentType: {},
      };
    }
    default:
      return state;
  }
}
