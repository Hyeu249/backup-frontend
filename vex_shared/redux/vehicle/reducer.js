import vehicleActions from './service/vehicle/actions';
import vehicleImagesActions from './service/images/actions';
import trailerActions from './service/trailer/actions';
import vehicleDocumentActions from './service/vehicleDocument/actions';
const initState = {
  //vehicle
  vehicles: [],
  vehicleTypes: [],
  viewedVehicle: {},
  //images
  vehicleImages: [],
  //trailer
  trailers: [],
  viewedTrailer: {},
  //vehicle documents
  vehicleDocuments: [],
  vehicleDocumentTypeOptions: [],
};

export default function vehicleReducer(state = initState, { type, ...action }) {
  switch (type) {
    //vehicle
    case vehicleActions.LOAD_VEHICLE: {
      return {
        ...state,
        vehicles: action.vehicles,
      };
    }
    case vehicleActions.REMOVE_VEHICLE: {
      return {
        ...state,
        vehicles: [],
      };
    }
    case vehicleActions.REMOVE_VEHICLE_TYPE_IN_VEHICLE: {
      return {
        ...state,
        vehicleTypes: [],
      };
    }
    case vehicleActions.LOAD_VEHICLE_TYPE_IN_VEHICLE: {
      return {
        ...state,
        vehicleTypes: action.vehicleTypes,
      };
    }
    case vehicleActions.UPDATE_VIEWED_VEHICLE: {
      return { ...state, viewedVehicle: { ...action.viewedVehicle } };
    }
    case vehicleActions.REMOVE_VIEWED_VEHICLE: {
      return { ...state, viewedVehicle: {} };
    }

    //images
    case vehicleImagesActions.LOAD_VEHICLE_IMAGE_IN_VEHICLE: {
      return { ...state, vehicleImages: action.vehicleImages };
    }
    case vehicleImagesActions.REMOVE_VEHICLE_IMAGE_IN_VEHICLE: {
      return { ...state, vehicleImages: [] };
    }
    //trailer
    case trailerActions.LOAD_TRAILER: {
      return {
        ...state,
        trailers: action.trailers,
      };
    }
    case trailerActions.REMOVE_TRAILER: {
      return {
        ...state,
        trailers: [],
      };
    }
    case trailerActions.UPDATE_VIEWED_TRAILER: {
      return {
        ...state,
        viewedTrailer: action.viewedTrailer,
      };
    }
    case trailerActions.REMOVE_VIEWED_TRAILER: {
      return {
        ...state,
        viewedTrailer: [],
      };
    }

    //vehicle document
    case vehicleDocumentActions.LOAD_VEHICLE_DOCUMENT: {
      return {
        ...state,
        vehicleDocuments: action.vehicleDocuments,
      };
    }
    case vehicleDocumentActions.REMOVE_VEHICLE_DOCUMENT: {
      return {
        ...state,
        vehicleDocuments: [],
      };
    }
    case vehicleDocumentActions.LOAD_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT: {
      return {
        ...state,
        vehicleDocumentTypeOptions: action.vehicleDocumentTypes,
      };
    }
    case vehicleDocumentActions.REMOVE_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT: {
      return {
        ...state,
        vehicleDocumentTypeOptions: [],
      };
    }
    default:
      return state;
  }
}
