import actions from './actions';

const initState = {
  fuels: [],
  viewedFuel: {},
  depositTypes: [],
};

export default function fuelReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.LOAD_FUEL: {
      return {
        ...state,
        fuels: action.fuels,
      };
    }
    case actions.REMOVE_FUEL: {
      return {
        ...state,
        fuels: [],
      };
    }
    case actions.UPDATE_VIEWED_FUEL: {
      return {
        ...state,
        viewedFuel: { ...action.viewedFuel },
      };
    }
    case actions.REMOVE_VIEWED_FUEL: {
      return {
        ...state,
        viewedFuel: {},
      };
    }
    default:
      return state;
  }
}
