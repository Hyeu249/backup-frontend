const actions = {
  INSERT_ASSET_WAREHOUSE: 'INSERT_ASSET_WAREHOUSE',
  GET_ASSET_WAREHOUSE: 'GET_ASSET_WAREHOUSE',
  UPDATE_ASSET_WAREHOUSE: 'UPDATE_ASSET_WAREHOUSE',
  DELETE_ASSET_WAREHOUSE: 'DELETE_ASSET_WAREHOUSE',

  LOAD_ASSET_WAREHOUSE: 'LOAD_ASSET_WAREHOUSE',
  REMOVE_ASSET_WAREHOUSE: 'REMOVE_ASSET_WAREHOUSE',

  SET_VIEWED_ASSET_WAREHOUSE: 'SET_VIEWED_ASSET_WAREHOUSE',
  UPDATE_VIEWED_ASSET_WAREHOUSE: 'UPDATE_VIEWED_ASSET_WAREHOUSE',
  REMOVE_VIEWED_ASSET_WAREHOUSE: 'REMOVE_VIEWED_ASSET_WAREHOUSE',

  //warehouse global
  GET_WAREHOUSE: 'GET_WAREHOUSE',
  LOAD_WAREHOUSE: 'LOAD_WAREHOUSE',
  SET_SELECTED_WAREHOUSE: 'SET_SELECTED_WAREHOUSE',
  LOAD_SELECTED_WAREHOUSE: 'LOAD_SELECTED_WAREHOUSE',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_ASSET_WAREHOUSE });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_ASSET_WAREHOUSE });
    };
  },

  createAssetWarehouse: payload => ({
    type: actions.INSERT_ASSET_WAREHOUSE,
    payload,
  }),
  updateAssetWarehouse: payload => ({
    type: actions.UPDATE_ASSET_WAREHOUSE,
    payload,
  }),
  deleteAssetWarehouse: assetWarehouseID => ({
    type: actions.DELETE_ASSET_WAREHOUSE,
    assetWarehouseID,
  }),
  removeViewedAssetWarehouse: () => ({
    type: actions.REMOVE_VIEWED_ASSET_WAREHOUSE,
  }),
  setViewedAssetWarehouse: payload => ({
    type: actions.SET_VIEWED_ASSET_WAREHOUSE,
    payload,
  }),

  setSelectedWarehouse: warehouseId => {
    return dispatch => {
      dispatch({
        type: actions.SET_SELECTED_WAREHOUSE,
        warehouseId,
      });
    };
  },
};

export default actions;
