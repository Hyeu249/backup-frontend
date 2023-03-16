import actions from './actions';

const initState = {
  driverDepositTypes: [],
  viewedDriverDepositType: {},
  depositTypes: [],
};

export default function driverDepositTypeReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    case actions.LOAD_DRIVER_DEPOSIT_TYPE: {
      return {
        ...state,
        driverDepositTypes: action.driverDepositTypes,
      };
    }
    case actions.REMOVE_DRIVER_DEPOSIT_TYPE: {
      return {
        ...state,
        driverDepositTypes: [],
      };
    }
    case actions.UPDATE_VIEWED_DRIVER_DEPOSIT_TYPE: {
      return {
        ...state,
        viewedDriverDepositType: { ...action.viewedDriverDepositType },
      };
    }
    case actions.REMOVE_VIEWED_DRIVER_DEPOSIT_TYPE: {
      return {
        ...state,
        viewedDriverDepositType: {},
      };
    }
    default:
      return state;
  }
}
