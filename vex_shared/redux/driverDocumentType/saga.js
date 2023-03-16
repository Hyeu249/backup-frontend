import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getDriverDocumentTypesApi,
  insertDriverDocumentTypeApi,
  updateDriverDocumentTypeApi,
  deleteDriverDocumentTypeApi,
  jsonApi,
  blobApi,
} from './apis';
import {
  convertTypeOfDriverDocumentType,
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
} from './helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getDriverDocumentTypes() {
  const res = yield call(getDriverDocumentTypesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const driverDocumentTypes = addKeyByIdToObjectArray(value?.result);

    yield put({ type: actions.LOAD_DRIVER_DOCUMENT_TYPE, driverDocumentTypes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertDriverDocumentType({ payload }) {
  //api call
  const driverDocumentType = convertTypeOfDriverDocumentType(payload.result);
  const setOpen = payload.setOpen;

  const res = yield call(insertDriverDocumentTypeApi, driverDocumentType);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu tài xế thành công');
    setOpen(false);
    yield put({ type: actions.GET_DRIVER_DOCUMENT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateDriverDocumentType({ payload }) {
  const setOpen = payload.setOpen;
  let { viewedDriverDocumentType } = yield select(
    state => state.driverDocumentType
  );
  const oldDriverDocumentType = convertTypeOfDriverDocumentType(
    viewedDriverDocumentType
  );
  const driverDocumentType = convertTypeOfDriverDocumentType(payload.result);

  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    driverDocumentType,
    oldDriverDocumentType
  );

  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //api
  const res = yield call(
    updateDriverDocumentTypeApi,
    fieldsNeedToUpdate,
    viewedDriverDocumentType.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu xe thành công');
    setOpen(false);
    yield put({
      type: actions.UPDATE_VIEWED_DRIVER_DOCUMENT_TYPE,
      viewedDriverDocumentType: {},
    });
    yield put({ type: actions.GET_DRIVER_DOCUMENT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteDriverDocumentType({ driverDocumentTypeID }) {
  //api
  const res = yield call(deleteDriverDocumentTypeApi, driverDocumentTypeID);
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu xe thành công');
    yield put({ type: actions.GET_DRIVER_DOCUMENT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedDriverDocumentType({ driverDocumentType }) {
  // convert driverDocumentType type
  const convertedDriverDocumentType =
    convertTypeOfDriverDocumentType(driverDocumentType);
  convertedDriverDocumentType.id = driverDocumentType.id;

  yield put({
    type: actions.UPDATE_VIEWED_DRIVER_DOCUMENT_TYPE,
    viewedDriverDocumentType: convertedDriverDocumentType,
  });
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.INSERT_DRIVER_DOCUMENT_TYPE,
      insertDriverDocumentType
    ),
    yield takeEvery(
      actions.UPDATE_DRIVER_DOCUMENT_TYPE,
      updateDriverDocumentType
    ),
    yield takeEvery(actions.GET_DRIVER_DOCUMENT_TYPE, getDriverDocumentTypes),
    yield takeEvery(
      actions.DELETE_DRIVER_DOCUMENT_TYPE,
      deleteDriverDocumentType
    ),
    yield takeEvery(
      actions.SET_VIEWED_DRIVER_DOCUMENT_TYPE,
      setViewedDriverDocumentType
    ),
  ]);
}
