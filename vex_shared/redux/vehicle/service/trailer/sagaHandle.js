import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';

import { attachTrailerApi, detachTrailerApi } from './apis';
import {
  getVehiclesApi,
  insertVehicleApi,
  updateVehicleApi,
  deleteVehicleApi,
  getVehicleByIdApi,
} from '@iso/vex_redux/vehicle/service/vehicle/apis';

import {
  convertTypeOfVehicle as convertTypeOfTrailer,
  getTrailers as getTrailersFromVehicle,
  addSemiTruck,
} from '@iso/vex_redux/vehicle/helpFunction';

import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  callSetErrFieldsWhenHaveErr,
  toValueLabelObjectArray,
  addLabelValueField,
  removeSomeField,
  jsonApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getTrailers() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getVehiclesApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const getTrailers = addSemiTruck(getTrailersFromVehicle(value?.result));
    const trailers = addKeyByIdToObjectArray(addLabelValueField(getTrailers));

    yield put({
      type: actions.LOAD_TRAILER,
      trailers: removeSomeField(trailers, ['is_trailer']),
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* createTrailer({ payload }) {
  const trailer = convertTypeOfTrailer(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //api call
  const res = yield call(insertVehicleApi, trailer, warehouse.id);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_TRAILER });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateTrailer({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedTrailer } = yield select(state => state.vehicle);
  const oldTrailer = convertTypeOfTrailer(viewedTrailer);
  const trailer = convertTypeOfTrailer(payload.result);
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  console.log('viewedTrailer', viewedTrailer);
  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(trailer, oldTrailer);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateVehicleApi,
    fieldsNeedToUpdate,
    viewedTrailer.id,
    warehouse.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.REMOVE_VIEWED_TRAILER });
    yield put({ type: actions.GET_TRAILER });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteTrailer({ trailerID }) {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //api
  const res = yield call(deleteVehicleApi, trailerID, warehouse.id);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_TRAILER });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedTrailer({ payload }) {
  const trailerID = payload.id;
  const setOpen = payload.setOpen;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );

  const res = yield call(getVehicleByIdApi, trailerID, warehouse.id);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    console.log('value', value);
    const trailer = convertTypeOfTrailer(value.result);
    trailer.id = trailerID;

    setOpen(true);
    yield put({ type: actions.UPDATE_VIEWED_TRAILER, viewedTrailer: trailer });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* attachTrailer({ payload }) {
  const { vehicleId, id } = payload;
  //api
  const res = yield call(attachTrailerApi, vehicleId, id);

  if (res?.status === SUCCESS) {
    notification('success', 'Gán rơ móc thành công');
    yield put({ type: actions.GET_TRAILER });
  } else {
    const { locale } = yield select(state => state.LanguageSwitcher.language);
    const value = yield call(jsonApi, res);
    const message = JSON.parse(value.message);

    notification('error', message[locale]);
  }
}

export function* detachTrailer({ payload }) {
  const { vehicleId, id } = payload;

  //api
  const res = yield call(detachTrailerApi, vehicleId, id);

  if (res?.status === SUCCESS) {
    notification('success', 'Tháo rơ móc thành công');
    yield put({ type: actions.GET_TRAILER });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
