import tyrePriceQuoteActions from './service/tyrePriceQuote/actions';
const initState = {
  //tyrePriceQuote
  tyrePriceQuotes: [],
  tyres: [],
  suppliers: [],
  viewedTyrePriceQuote: {},
  //options
  approverOptions: [],
};

export default function tyrePriceQuoteReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //tyrePriceQuote
    case tyrePriceQuoteActions.LOAD_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        tyrePriceQuotes: action.tyrePriceQuotes,
      };
    }
    case tyrePriceQuoteActions.REMOVE_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        tyrePriceQuotes: [],
      };
    }
    case tyrePriceQuoteActions.LOAD_APPROVER_IN_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        approverOptions: action.approvers,
      };
    }
    case tyrePriceQuoteActions.REMOVE_APPROVER_IN_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        approverOptions: [],
      };
    }
    case tyrePriceQuoteActions.REMOVE_TYRE_IN_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        tyres: [],
      };
    }
    case tyrePriceQuoteActions.REMOVE_SUPPLIER_IN_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        suppliers: [],
      };
    }
    case tyrePriceQuoteActions.LOAD_TYRE_IN_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        tyres: action.tyres,
      };
    }
    case tyrePriceQuoteActions.LOAD_SUPPLIER_IN_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        suppliers: action.suppliers,
      };
    }
    case tyrePriceQuoteActions.UPDATE_VIEWED_TYRE_PRICE_QUOTE: {
      return {
        ...state,
        viewedTyrePriceQuote: { ...action.viewedTyrePriceQuote },
      };
    }
    case tyrePriceQuoteActions.REMOVE_VIEWED_TYRE_PRICE_QUOTE: {
      return { ...state, viewedTyrePriceQuote: {} };
    }
    default:
      return state;
  }
}
