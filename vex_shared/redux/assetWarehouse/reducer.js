import actions from './actions';

const initState = {
  assetWarehouses: [],
  viewedAssetWarehouse: {},
  //warehouse global
  selectedWarehouse: {},
  warehouses: [],
};

export default function assetWarehouseReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    case actions.LOAD_ASSET_WAREHOUSE: {
      return {
        ...state,
        assetWarehouses: action.assetWarehouses,
      };
    }
    case actions.REMOVE_ASSET_WAREHOUSE: {
      return {
        ...state,
        assetWarehouses: [],
      };
    }
    case actions.UPDATE_VIEWED_ASSET_WAREHOUSE: {
      return {
        ...state,
        viewedAssetWarehouse: { ...action.viewedAssetWarehouse },
      };
    }
    case actions.REMOVE_VIEWED_ASSET_WAREHOUSE: {
      return {
        ...state,
        viewedAssetWarehouse: {},
      };
    }

    //warehouse global
    case actions.LOAD_SELECTED_WAREHOUSE: {
      return {
        ...state,
        selectedWarehouse: action.warehouse,
      };
    }
    case actions.LOAD_WAREHOUSE:
      return {
        ...state,
        warehouses: action.warehouses,
      };
    default:
      return state;
  }
}
