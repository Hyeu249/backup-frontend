import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getVehiclesApi,
  insertVehicleApi,
  updateVehicleApi,
  deleteVehicleApi,
  getVehicleByIdApi,
  //
} from './apis';
import { getVehicleTypesApi } from '@iso/vex_redux/vehicleType/apis';
import {
  convertTypeOfVehicle,
  getSemiTrucks,
} from '@iso/vex_redux/vehicle/helpFunction';

import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  callSetErrFieldsWhenHaveErr,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getVehicles() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getVehiclesApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const semiTrucks = getSemiTrucks(value?.result);

    const vehicles = addKeyByIdToObjectArray(semiTrucks);
    yield put({ type: actions.LOAD_VEHICLE, vehicles });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getVehicleTypes() {
  const res = yield call(getVehicleTypesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const vehicleTypes = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_VEHICLE_TYPE_IN_VEHICLE, vehicleTypes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertVehicle({ payload }) {
  const vehicle = convertTypeOfVehicle(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //api call
  const res = yield call(insertVehicleApi, vehicle, warehouse.id);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_VEHICLE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateVehicle({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedVehicle } = yield select(state => state.vehicle);
  const oldVehicle = convertTypeOfVehicle(viewedVehicle);
  const vehicle = convertTypeOfVehicle(payload.result);
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(vehicle, oldVehicle);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateVehicleApi,
    fieldsNeedToUpdate,
    viewedVehicle.id,
    warehouse.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_VEHICLE,
      payload: { vehicleID: viewedVehicle.id },
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteVehicle(a) {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //api
  const res = yield call(deleteVehicleApi, a.vehicleID, warehouse.id);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_VEHICLE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedVehicle({ payload }) {
  const vehicleID = payload.vehicleID;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getVehicleByIdApi, vehicleID, warehouse.id);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const vehicle = convertTypeOfVehicle(value.result);
    vehicle.id = payload.vehicleID;

    yield put({ type: actions.UPDATE_VIEWED_VEHICLE, viewedVehicle: vehicle });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
