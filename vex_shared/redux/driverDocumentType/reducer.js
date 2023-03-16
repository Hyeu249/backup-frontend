import actions from './actions';

const initState = {
  driverDocumentTypes: [],
  viewedDriverDocumentType: {},
  depositTypes: [],
};

export default function driverDocumentTypeReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    case actions.LOAD_DRIVER_DOCUMENT_TYPE: {
      return {
        ...state,
        driverDocumentTypes: action.driverDocumentTypes,
      };
    }
    case actions.UPDATE_VIEWED_DRIVER_DOCUMENT_TYPE: {
      return {
        ...state,
        viewedDriverDocumentType: { ...action.viewedDriverDocumentType },
      };
    }
    case actions.REMOVE_VIEWED_DRIVER_DOCUMENT_TYPE: {
      return {
        ...state,
        viewedDriverDocumentType: {},
      };
    }
    default:
      return state;
  }
}
