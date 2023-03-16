import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  GetDocumentListByDriver,
  insertDriverDocumentApi,
  deleteDriverDocumentApi,
  getDriverDocumentByIdApi,
  //
} from './apis';
import {
  getDriverDocumentTypesApi,
  getDriverDocumentTypeByIdApi,
} from '@iso/vex_redux/driverDocumentType/apis';
import { convertTypeOfDriverDocument } from '@iso/vex_redux/driver/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getDriverDocuments({ driverId }) {
  const res = yield call(GetDocumentListByDriver, driverId);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const driverDocuments = addKeyByIdToObjectArray(value?.result);
    for (const [i, raw] of driverDocuments.entries()) {
      const data = cloneDeep(raw);
      const documentTypeRes = yield call(
        getDriverDocumentTypeByIdApi,
        data.driver_document_type_id
      );
      if (documentTypeRes.status === SUCCESS) {
        const documentTypeValue = yield call(jsonApi, documentTypeRes);
        driverDocuments[i].value = driverDocuments[i].id;
        driverDocuments[i].label = documentTypeValue.result.name;
      } else {
        notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
      }
    }

    yield put({
      type: actions.LOAD_DRIVER_DOCUMENT,
      driverDocuments,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getDriverDocumentTypeOptions() {
  const res = yield call(getDriverDocumentTypesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const driverDocumentTypes = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT,
      driverDocumentTypes,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* createDriverDocument({ payload }) {
  const driverDocument = convertTypeOfDriverDocument(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  console.log('driverDocument', driverDocument);
  //api call
  const res = yield call(
    insertDriverDocumentApi,
    driverDocument,
    payload.result.driver_id
  );
  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.GET_DRIVER_DOCUMENT,
      driverId: payload.result.driver_id,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteDriverDocument({ id, driverId }) {
  //api
  const res = yield call(deleteDriverDocumentApi, id);
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({
      type: actions.GET_DRIVER_DOCUMENT,
      driverId: driverId,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedDriverDocument({ payload }) {
  const id = payload.id;
  console.log('id: ', id);
  return;
  const res = yield call(getDriverDocumentByIdApi, id);
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
