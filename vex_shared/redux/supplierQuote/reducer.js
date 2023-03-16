import supplierQuoteActions from './service/supplierQuote/actions';
const initState = {
  //supplierQuote
  supplierQuotes: [],
  serviceTypes: [],
  equipments: [],
  suppliers: [],
  viewedSupplierQuote: {},
  //options
  approverOptions: [],
};

export default function supplierQuoteReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //supplierQuote
    case supplierQuoteActions.LOAD_SUPPLIER_QUOTE: {
      return {
        ...state,
        supplierQuotes: action.supplierQuotes,
      };
    }
    case supplierQuoteActions.REMOVE_SUPPLIER_QUOTE: {
      return {
        ...state,
        supplierQuotes: [],
      };
    }
    case supplierQuoteActions.LOAD_APPROVER_IN_SUPPLIER_QUOTE: {
      return {
        ...state,
        approverOptions: action.approvers,
      };
    }
    case supplierQuoteActions.REMOVE_APPROVER_IN_SUPPLIER_QUOTE: {
      return {
        ...state,
        approverOptions: [],
      };
    }
    case supplierQuoteActions.REMOVE_SUPPLIER_IN_SUPPLIER_QUOTE: {
      return {
        ...state,
        suppliers: [],
      };
    }
    case supplierQuoteActions.REMOVE_EQUIPMENT_IN_SUPPLIER_QUOTE: {
      return {
        ...state,
        equipments: [],
      };
    }
    case supplierQuoteActions.REMOVE_SERVICE_TYPE_IN_SUPPLIER_QUOTE: {
      return {
        ...state,
        serviceTypes: [],
      };
    }
    case supplierQuoteActions.LOAD_SUPPLIER_IN_SUPPLIER_QUOTE: {
      return {
        ...state,
        suppliers: action.suppliers,
      };
    }
    case supplierQuoteActions.LOAD_EQUIPMENT_IN_SUPPLIER_QUOTE: {
      return {
        ...state,
        equipments: action.equipments,
      };
    }
    case supplierQuoteActions.LOAD_SERVICE_TYPE_IN_SUPPLIER_QUOTE: {
      return {
        ...state,
        serviceTypes: action.serviceTypes,
      };
    }
    case supplierQuoteActions.UPDATE_VIEWED_SUPPLIER_QUOTE: {
      return {
        ...state,
        viewedSupplierQuote: { ...action.viewedSupplierQuote },
      };
    }
    case supplierQuoteActions.REMOVE_VIEWED_SUPPLIER_QUOTE: {
      return { ...state, viewedSupplierQuote: {} };
    }
    default:
      return state;
  }
}
