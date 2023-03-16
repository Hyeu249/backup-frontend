import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getDriversApi,
  insertDriverApi,
  updateDriverApi,
  deleteDriverApi,
  getDriverByIdApi,
} from './apis';

import { getDriverDepositTypesApi } from '@iso/vex_redux/driverDepositType/apis';

import { convertTypeOfDriver } from '@iso/vex_redux/driver/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  callSetErrFieldsWhenHaveErr,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';

import errorCode from '@iso/vex_redux/error_code.json';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getDrivers({ warehouseID }) {
  const res = yield call(getDriversApi, warehouseID);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const drivers = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_DRIVER, drivers });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getDepositTypes() {
  const res = yield call(getDriverDepositTypesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const depositTypes = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_DRIVER_DEPOSIT_TYPE_IN_DRIVER,
      depositTypes,
    });
  } else {
    notification(
      'error',
      'Lấy dữ liệu không thành công, vui lòng liên hệ kỹ thuật'
    );
  }
}
export function* insertDriver({ payload }) {
  const driver = convertTypeOfDriver(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertDriverApi, driver);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_DRIVER });
  } else {
    const { locale } = yield select(state => state.LanguageSwitcher.language);
    const value = yield call(jsonApi, res);
    const message = JSON.parse(value.message);
    const localErrorCodes = errorCode.errors;
    const isHaveField = localErrorCodes[message.error_code].field !== undefined;

    if (isHaveField) {
      const field = localErrorCodes[message.error_code].field;
      let text = message[locale];
      if (message[locale].length > 40) {
        text = message[locale].substring(0, 40) + '...';
      }

      setErrFields({
        [field]: text,
      });
    }
    notification('error', message[locale]);
  }
}

export function* updateDriver({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedDriver } = yield select(state => state.driver);
  const oldDriver = convertTypeOfDriver(viewedDriver);
  const driver = convertTypeOfDriver(payload.result);

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(driver, oldDriver);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(updateDriverApi, fieldsNeedToUpdate, viewedDriver.id);

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_DRIVER,
      payload: { driverID: viewedDriver.id },
    });
  } else {
    const { locale } = yield select(state => state.LanguageSwitcher.language);
    const value = yield call(jsonApi, res);
    const message = JSON.parse(value.message);
    const localErrorCodes = errorCode.errors;
    const isHaveField = localErrorCodes[message.error_code].field !== undefined;

    if (isHaveField) {
      const field = localErrorCodes[message.error_code].field;
      let text = message[locale];
      if (message[locale].length > 40) {
        text = message[locale].substring(0, 40) + '...';
      }

      setErrFields({
        [field]: text,
      });
    }
    notification('error', message[locale]);
  }
}

export function* deleteDriver(a) {
  //api
  const res = yield call(deleteDriverApi, a.driverID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_DRIVER });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedDriver({ payload }) {
  const driverID = payload.driverID;
  const res = yield call(getDriverByIdApi, driverID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const driver = convertTypeOfDriver(value.result);
    driver.id = payload.driverID;

    yield put({
      type: actions.UPDATE_VIEWED_DRIVER,
      viewedDriver: driver,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
