import contractActions from './service/contract/actions';
const initState = {
  //contract
  contracts: [],
  suppliers: [],
  viewedContract: {},
  //options
  approverOptions: [],
};

export default function contractReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //contract
    case contractActions.LOAD_CONTRACT: {
      return {
        ...state,
        contracts: action.contracts,
      };
    }
    case contractActions.REMOVE_CONTRACT: {
      return {
        ...state,
        contracts: [],
      };
    }
    case contractActions.LOAD_APPROVER_IN_CONTRACT: {
      return {
        ...state,
        approverOptions: action.approvers,
      };
    }
    case contractActions.REMOVE_APPROVER_IN_CONTRACT: {
      return {
        ...state,
        approverOptions: [],
      };
    }
    case contractActions.REMOVE_SUPPLIER_IN_CONTRACT: {
      return {
        ...state,
        suppliers: [],
      };
    }
    case contractActions.LOAD_SUPPLIER_IN_CONTRACT: {
      return {
        ...state,
        suppliers: action.suppliers,
      };
    }
    case contractActions.UPDATE_VIEWED_CONTRACT: {
      return { ...state, viewedContract: { ...action.viewedContract } };
    }
    case contractActions.REMOVE_VIEWED_CONTRACT: {
      return { ...state, viewedContract: {} };
    }
    default:
      return state;
  }
}
