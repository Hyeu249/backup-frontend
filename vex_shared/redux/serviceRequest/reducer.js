import serviceRequestActions from './service/serviceRequest/actions';
const initState = {
  //serviceRequest
  serviceRequests: [],
  viewedServiceRequest: {},
  //options
  driverOptions: [],
  vehicleOptions: [],
  equipmentServiceRequestOptions: [],
  tyreServiceRequestOptions: [],
  approverOptions: [],
};

export default function serviceRequestReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //serviceRequest
    case serviceRequestActions.LOAD_SERVICE_REQUEST: {
      return {
        ...state,
        serviceRequests: action.serviceRequests,
      };
    }
    case serviceRequestActions.REMOVE_SERVICE_REQUEST: {
      return {
        ...state,
        serviceRequests: [],
      };
    }
    case serviceRequestActions.REMOVE_DRIVER_IN_SERVICE_REQUEST: {
      return {
        ...state,
        driverOptions: [],
      };
    }
    case serviceRequestActions.REMOVE_VEHICLE_IN_SERVICE_REQUEST: {
      return {
        ...state,
        vehicleOptions: [],
      };
    }
    case serviceRequestActions.REMOVE_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST: {
      return {
        ...state,
        equipmentServiceRequestOptions: [],
      };
    }
    case serviceRequestActions.REMOVE_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST: {
      return {
        ...state,
        tyreServiceRequestOptions: [],
      };
    }
    case serviceRequestActions.LOAD_DRIVER_IN_SERVICE_REQUEST: {
      return {
        ...state,
        driverOptions: action.drivers,
      };
    }
    case serviceRequestActions.LOAD_VEHICLE_IN_SERVICE_REQUEST: {
      return {
        ...state,
        vehicleOptions: action.vehicles,
      };
    }
    case serviceRequestActions.LOAD_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST: {
      return {
        ...state,
        equipmentServiceRequestOptions: action.equipmentServiceRequests,
      };
    }
    case serviceRequestActions.LOAD_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST: {
      return {
        ...state,
        tyreServiceRequestOptions: action.tyreServiceRequests,
      };
    }
    case serviceRequestActions.UPDATE_VIEWED_SERVICE_REQUEST: {
      return {
        ...state,
        viewedServiceRequest: { ...action.viewedServiceRequest },
      };
    }
    case serviceRequestActions.REMOVE_VIEWED_SERVICE_REQUEST: {
      return { ...state, viewedServiceRequest: {} };
    }
    case serviceRequestActions.LOAD_APPROVER_IN_SERVICE_REQUEST: {
      return {
        ...state,
        approverOptions: action.approvers,
      };
    }
    case serviceRequestActions.REMOVE_APPROVER_IN_SERVICE_REQUEST: {
      return {
        ...state,
        approverOptions: [],
      };
    }
    default:
      return state;
  }
}
