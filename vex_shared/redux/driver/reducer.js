import driverActions from './service/driver/actions';
import driverDocumentActions from './service/driverDocument/actions';
import imagesActions from './service/images/actions';
const initState = {
  //driver
  drivers: [],
  depositTypes: [],
  viewedDriver: {},
  //driver document
  driverDocuments: [],
  viewedDriverDocument: {},
  driverDocumentTypeOptions: [],
  //images
  driverDocumentImages: [],
  driverDocumentOptions: [],
};

export default function driverReducer(state = initState, { type, ...action }) {
  switch (type) {
    //driver
    case driverActions.LOAD_DRIVER: {
      return {
        ...state,
        drivers: action.drivers,
      };
    }
    case driverActions.REMOVE_DRIVER: {
      return {
        ...state,
        drivers: [],
      };
    }
    case driverActions.LOAD_DRIVER_DEPOSIT_TYPE_IN_DRIVER: {
      return {
        ...state,
        depositTypes: action.depositTypes,
      };
    }
    case driverActions.REMOVE_DRIVER_DEPOSIT_TYPE_IN_DRIVER: {
      return {
        ...state,
        depositTypes: [],
      };
    }
    case driverActions.UPDATE_VIEWED_DRIVER: {
      return { ...state, viewedDriver: { ...action.viewedDriver } };
    }
    case driverActions.REMOVE_VIEWED_DRIVER: {
      return { ...state, viewedDriver: {} };
    }
    //driver document
    case driverDocumentActions.LOAD_DRIVER_DOCUMENT: {
      return {
        ...state,
        driverDocuments: action.driverDocuments,
      };
    }
    case driverDocumentActions.LOAD_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT: {
      return {
        ...state,
        driverDocumentTypeOptions: action.driverDocumentTypes,
      };
    }
    case driverDocumentActions.REMOVE_DRIVER_DOCUMENT: {
      return {
        ...state,
        driverDocuments: [],
      };
    }
    case driverDocumentActions.REMOVE_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT: {
      return {
        ...state,
        driverDocumentTypeOptions: [],
      };
    }
    //viewed driver document
    case driverDocumentActions.LOAD_VIEWED_DRIVER_DOCUMENT: {
      return {
        ...state,
        viewedDriverDocument: action.driverDocument,
      };
    }
    case driverDocumentActions.REMOVE_VIEWED_DRIVER_DOCUMENT: {
      return {
        ...state,
        viewedDriverDocument: {},
      };
    }
    //images
    case imagesActions.LOAD_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT: {
      return {
        ...state,
        driverDocumentImages: action.images,
      };
    }
    case imagesActions.REMOVE_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT: {
      return {
        ...state,
        driverDocumentImages: [],
      };
    }
    case imagesActions.LOAD_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE: {
      return {
        ...state,
        driverDocumentOptions: action.driverDocuments,
      };
    }
    case imagesActions.REMOVE_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE: {
      return {
        ...state,
        driverDocumentOptions: [],
      };
    }
    default:
      return state;
  }
}
