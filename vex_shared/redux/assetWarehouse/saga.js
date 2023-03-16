import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getAssetWarehousesApi,
  insertAssetWarehouseApi,
  updateAssetWarehouseApi,
  deleteAssetWarehouseApi,
  getAssetWarehousesByIdApi,
} from './apis';
import { convertTypeOfAssetWarehouse } from './helpFunction';

import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  jsonApi,
  blobApi,
} from '@iso/vex_redux/helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getAssetWarehouses() {
  //call api
  const res = yield call(getAssetWarehousesApi);

  //react if have response
  if (res?.status === SUCCESS) {
    //parse json
    const value = yield call(jsonApi, res);
    //adding key field to every object value
    const assetWarehouses = addKeyByIdToObjectArray(value?.result);
    //load assetWarehouses to redux
    yield put({ type: actions.LOAD_ASSET_WAREHOUSE, assetWarehouses });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertAssetWarehouse({ payload }) {
  //convert types to types of AssetWarehouse
  const assetWarehouse = convertTypeOfAssetWarehouse(payload.result);

  //get setOpen
  const setOpen = payload.setOpen;
  //using api to call to backend
  const res = yield call(insertAssetWarehouseApi, assetWarehouse);

  //react if have response
  if (res?.status === SUCCESS) {
    //send success message
    notification('success', 'Tạo dữ liệu tài xế thành công');
    //close create modal
    setOpen(false);
    yield put({ type: actions.GET_ASSET_WAREHOUSE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateAssetWarehouse({ payload }) {
  const setOpen = payload.setOpen;

  //select assetWarehouse from redux
  let { viewedAssetWarehouse } = yield select(state => state.assetWarehouse);
  //convert types of the old one to types of AssetWarehouse
  const oldAssetWarehouse = convertTypeOfAssetWarehouse(viewedAssetWarehouse);
  //convert types of the new one to types of AssetWarehouse
  const assetWarehouse = convertTypeOfAssetWarehouse(payload.result);

  //compare old and new one to get fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    assetWarehouse,
    oldAssetWarehouse
  );

  //if no field need to update, return
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //if have field need to update, call api to update
  const res = yield call(
    updateAssetWarehouseApi,
    fieldsNeedToUpdate,
    viewedAssetWarehouse.id
  );

  //react after have response
  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    //close update modal
    setOpen(false);
    //set viewedAssetWarehouse at redux to empty
    yield put({
      type: actions.REMOVE_VIEWED_ASSET_WAREHOUSE,
    });
    //get the newest assetWarehouses at redux after update one
    yield put({ type: actions.GET_ASSET_WAREHOUSE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteAssetWarehouse(a) {
  //call api
  const res = yield call(deleteAssetWarehouseApi, a.assetWarehouseID);

  //react if have response
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    //get the newest assetWarehouses after delete one
    yield put({ type: actions.GET_ASSET_WAREHOUSE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedAssetWarehouse({ payload }) {
  const id = payload.id;
  const setOpen = payload.setOpen;
  // call api to get assetWarehouse
  const res = yield call(getAssetWarehousesByIdApi, id);

  if (res.status === SUCCESS) {
    const data = yield call(jsonApi, res);
    const assetWarehouse = data.result;

    // convert assetWarehouse type
    const convertedAssetWarehouse = convertTypeOfAssetWarehouse(assetWarehouse);
    convertedAssetWarehouse.id = assetWarehouse.id;

    //update viewedAssetWarehouse at redux
    yield put({
      type: actions.UPDATE_VIEWED_ASSET_WAREHOUSE,
      viewedAssetWarehouse: convertedAssetWarehouse,
    });
    setOpen(true);
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setSelectedWarehouse({ warehouseId }) {
  const res = yield call(getAssetWarehousesByIdApi, warehouseId);

  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    yield put({
      type: actions.LOAD_SELECTED_WAREHOUSE,
      warehouse: value.result,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getWarehouses() {
  const res = yield call(getAssetWarehousesApi);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    yield put({
      type: actions.LOAD_WAREHOUSE,
      warehouses: value.result || [],
    });
  } else {
    notification(
      'error',
      'Không lấy được dữ liệu từ kho, vui lòng liên hệ kỹ thuật!'
    );
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.INSERT_ASSET_WAREHOUSE, insertAssetWarehouse),
    yield takeEvery(actions.UPDATE_ASSET_WAREHOUSE, updateAssetWarehouse),
    yield takeEvery(actions.GET_ASSET_WAREHOUSE, getAssetWarehouses),
    yield takeEvery(actions.DELETE_ASSET_WAREHOUSE, deleteAssetWarehouse),
    yield takeEvery(
      actions.SET_VIEWED_ASSET_WAREHOUSE,
      setViewedAssetWarehouse
    ),
    //warehouse global
    yield takeEvery(actions.SET_SELECTED_WAREHOUSE, setSelectedWarehouse),
    yield takeEvery(actions.GET_WAREHOUSE, getWarehouses),
  ]);
}
