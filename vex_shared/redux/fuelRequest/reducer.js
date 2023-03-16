import fuelRequestActions from './service/fuelRequest/actions';
const initState = {
  //fuelRequest
  fuelRequests: [],
  vehicles: [],
  drivers: [],
  fuelPriceQuotes: [],
  viewedFuelRequest: {},
  approverOptions: [],
};

export default function fuelRequestReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //fuelRequest
    case fuelRequestActions.LOAD_FUEL_REQUEST: {
      return {
        ...state,
        fuelRequests: action.fuelRequests,
      };
    }
    case fuelRequestActions.REMOVE_FUEL_REQUEST: {
      return {
        ...state,
        fuelRequests: [],
      };
    }
    case fuelRequestActions.LOAD_APPROVER_IN_FUEL_REQUEST: {
      return {
        ...state,
        approverOptions: action.approvers,
      };
    }
    case fuelRequestActions.REMOVE_APPROVER_IN_FUEL_REQUEST: {
      return {
        ...state,
        approverOptions: [],
      };
    }
    case fuelRequestActions.REMOVE_VEHICLE_IN_FUEL_REQUEST: {
      return {
        ...state,
        vehicles: [],
      };
    }
    case fuelRequestActions.REMOVE_DRIVER_IN_FUEL_REQUEST: {
      return {
        ...state,
        drivers: [],
      };
    }
    case fuelRequestActions.REMOVE_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST: {
      return {
        ...state,
        fuelPriceQuotes: [],
      };
    }
    case fuelRequestActions.LOAD_VEHICLE_IN_FUEL_REQUEST: {
      return {
        ...state,
        vehicles: action.vehicles,
      };
    }
    case fuelRequestActions.LOAD_DRIVER_IN_FUEL_REQUEST: {
      return {
        ...state,
        drivers: action.drivers,
      };
    }
    case fuelRequestActions.LOAD_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST: {
      return {
        ...state,
        fuelPriceQuotes: action.fuelPriceQuotes,
      };
    }
    case fuelRequestActions.UPDATE_VIEWED_FUEL_REQUEST: {
      return { ...state, viewedFuelRequest: { ...action.viewedFuelRequest } };
    }
    case fuelRequestActions.REMOVE_VIEWED_FUEL_REQUEST: {
      return { ...state, viewedFuelRequest: {} };
    }
    default:
      return state;
  }
}
