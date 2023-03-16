import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getTyresApi,
  insertTyreApi,
  updateTyreApi,
  deleteTyreApi,
  getTyreByIdApi,
  //
} from './apis';
import { convertTypeOfTyre } from '../../helpFunction';

import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  callSetErrFieldsWhenHaveErr,
  jsonApi,
} from '@iso/vex_redux/helpFunction';
import errorCode from '@iso/vex_redux/error_code.json';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getTyres() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getTyresApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const tyres = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_TYRE, tyres });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertTyre({ payload }) {
  const tyre = convertTypeOfTyre(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //api call
  const res = yield call(insertTyreApi, tyre, warehouse.id);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_TYRE });
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

export function* updateTyre({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedTyre } = yield select(state => state.tyre);
  const oldTyre = convertTypeOfTyre(viewedTyre);
  const tyre = convertTypeOfTyre(payload.result);
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(tyre, oldTyre);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateTyreApi,
    fieldsNeedToUpdate,
    viewedTyre.id,
    warehouse.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_TYRE,
      payload: { tyreID: viewedTyre.id },
    });
    yield put({ type: actions.GET_TYRE });
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

export function* deleteTyre(a) {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //api
  const res = yield call(deleteTyreApi, a.tyreID, warehouse.id);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_TYRE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedTyre({ payload }) {
  const tyreID = payload.tyreID;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getTyreByIdApi, tyreID, warehouse.id);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const tyre = convertTypeOfTyre(value.result);
    tyre.id = payload.tyreID;

    yield put({ type: actions.UPDATE_VIEWED_TYRE, viewedTyre: tyre });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
