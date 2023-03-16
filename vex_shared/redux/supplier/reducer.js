import supplierActions from './service/supplier/actions';
const initState = {
  //supplier
  suppliers: [],
  viewedSupplier: {},
};

export default function supplierReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //supplier
    case supplierActions.LOAD_SUPPLIER: {
      return {
        ...state,
        suppliers: action.suppliers,
      };
    }
    case supplierActions.REMOVE_SUPPLIER: {
      return {
        ...state,
        suppliers: [],
      };
    }
    case supplierActions.UPDATE_VIEWED_SUPPLIER: {
      return { ...state, viewedSupplier: { ...action.viewedSupplier } };
    }
    case supplierActions.REMOVE_VIEWED_SUPPLIER: {
      return { ...state, viewedSupplier: {} };
    }
    default:
      return state;
  }
}
