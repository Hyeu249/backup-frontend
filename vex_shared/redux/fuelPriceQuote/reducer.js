import fuelPriceQuoteActions from './service/fuelPriceQuote/actions';
const initState = {
  //fuelPriceQuote
  fuelPriceQuotes: [],
  fuels: [],
  suppliers: [],
  viewedFuelPriceQuote: {},
  //options
  approverOptions: [],
};

export default function fuelPriceQuoteReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //fuelPriceQuote
    case fuelPriceQuoteActions.LOAD_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        fuelPriceQuotes: action.fuelPriceQuotes,
      };
    }
    case fuelPriceQuoteActions.REMOVE_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        fuelPriceQuotes: [],
      };
    }
    case fuelPriceQuoteActions.LOAD_APPROVER_IN_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        approverOptions: action.approvers,
      };
    }
    case fuelPriceQuoteActions.REMOVE_APPROVER_IN_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        approverOptions: [],
      };
    }
    case fuelPriceQuoteActions.REMOVE_FUEL_IN_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        fuels: [],
      };
    }
    case fuelPriceQuoteActions.REMOVE_SUPPLIER_IN_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        suppliers: [],
      };
    }
    case fuelPriceQuoteActions.LOAD_FUEL_IN_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        fuels: action.fuels,
      };
    }
    case fuelPriceQuoteActions.LOAD_SUPPLIER_IN_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        suppliers: action.suppliers,
      };
    }
    case fuelPriceQuoteActions.UPDATE_VIEWED_FUEL_PRICE_QUOTE: {
      return {
        ...state,
        viewedFuelPriceQuote: { ...action.viewedFuelPriceQuote },
      };
    }
    case fuelPriceQuoteActions.REMOVE_VIEWED_FUEL_PRICE_QUOTE: {
      return { ...state, viewedFuelPriceQuote: {} };
    }
    default:
      return state;
  }
}
