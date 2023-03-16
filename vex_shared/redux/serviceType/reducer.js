import actions from './actions';

const initState = {
  serviceTypes: [],
  viewedServiceType: {},
};

export default function serviceTypeReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    case actions.LOAD_SERVICE_TYPE: {
      return {
        ...state,
        serviceTypes: action.serviceTypes,
      };
    }
    case actions.REMOVE_SERVICE_TYPE: {
      return {
        ...state,
        serviceTypes: [],
      };
    }
    case actions.UPDATE_VIEWED_SERVICE_TYPE: {
      return {
        ...state,
        viewedServiceType: { ...action.viewedServiceType },
      };
    }
    case actions.REMOVE_VIEWED_SERVICE_TYPE: {
      return {
        ...state,
        viewedServiceType: {},
      };
    }
    default:
      return state;
  }
}
