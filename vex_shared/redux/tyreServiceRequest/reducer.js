import tyreServiceRequestActions from './service/tyreServiceRequest/actions';
const initState = {
  //tyreServiceRequest
  tyreServiceRequests: [],
  tyrePriceQuotes: [],
  viewedTyreServiceRequest: {},
};

export default function tyreServiceRequestReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //tyreServiceRequest
    case tyreServiceRequestActions.LOAD_TYRE_SERVICE_REQUEST: {
      return {
        ...state,
        tyreServiceRequests: action.tyreServiceRequests,
      };
    }
    case tyreServiceRequestActions.LOAD_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST: {
      return {
        ...state,
        tyrePriceQuotes: action.tyrePriceQuotes,
      };
    }
    case tyreServiceRequestActions.REMOVE_TYRE_SERVICE_REQUEST: {
      return {
        ...state,
        tyreServiceRequests: [],
      };
    }
    case tyreServiceRequestActions.REMOVE_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST: {
      return {
        ...state,
        tyrePriceQuotes: [],
      };
    }
    case tyreServiceRequestActions.UPDATE_VIEWED_TYRE_SERVICE_REQUEST: {
      return {
        ...state,
        viewedTyreServiceRequest: { ...action.viewedTyreServiceRequest },
      };
    }
    case tyreServiceRequestActions.REMOVE_VIEWED_TYRE_SERVICE_REQUEST: {
      return { ...state, viewedTyreServiceRequest: {} };
    }
    default:
      return state;
  }
}
