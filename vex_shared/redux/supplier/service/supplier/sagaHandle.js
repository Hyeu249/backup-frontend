import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getSuppliersApi,
  insertSupplierApi,
  updateSupplierApi,
  deleteSupplierApi,
  getSupplierByIdApi,
  //
} from './apis';
import { convertTypeOfSupplier } from '@iso/vex_redux/supplier/helpFunction';
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

export function* getSuppliers({ warehouseID }) {
  const res = yield call(getSuppliersApi, warehouseID);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const suppliers = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_SUPPLIER, suppliers });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertSupplier({ payload }) {
  const supplier = convertTypeOfSupplier(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertSupplierApi, supplier);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_SUPPLIER });
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

export function* updateSupplier({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedSupplier } = yield select(state => state.supplier);
  const oldSupplier = convertTypeOfSupplier(viewedSupplier);
  const supplier = convertTypeOfSupplier(payload.result);

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(supplier, oldSupplier);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateSupplierApi,
    fieldsNeedToUpdate,
    viewedSupplier.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_SUPPLIER,
      payload: { supplierID: viewedSupplier.id },
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

export function* deleteSupplier(a) {
  //api
  const res = yield call(deleteSupplierApi, a.supplierID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_SUPPLIER });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedSupplier({ payload }) {
  const supplierID = payload.supplierID;
  const res = yield call(getSupplierByIdApi, supplierID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const supplier = convertTypeOfSupplier(value.result);
    supplier.id = payload.supplierID;

    yield put({
      type: actions.UPDATE_VIEWED_SUPPLIER,
      viewedSupplier: supplier,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
