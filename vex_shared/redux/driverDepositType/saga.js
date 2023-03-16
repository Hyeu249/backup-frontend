import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getDriverDepositTypesApi,
  insertDriverDepositTypeApi,
  updateDriverDepositTypeApi,
  deleteDriverDepositTypeApi,
} from './apis';
import {
  convertTypeOfDriverDepositType,
  // addKeyByIdToObjectArray,
  // getFieldsNeedToUpdate,
} from './helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  jsonApi,
  blobApi,
} from '@iso/vex_redux/helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getDriverDepositTypes() {
  //call api
  const res = yield call(getDriverDepositTypesApi);

  //react if have response
  if (res?.status === SUCCESS) {
    //parse json
    const value = yield call(jsonApi, res);
    //adding key field to every object value
    const driverDepositTypes = addKeyByIdToObjectArray(value?.result);
    //load driverDepositTypes to redux
    yield put({ type: actions.LOAD_DRIVER_DEPOSIT_TYPE, driverDepositTypes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertDriverDepositType({ payload }) {
  //convert types to types of DriverDepositType
  const driverDepositType = convertTypeOfDriverDepositType(payload.result);
  //get setOpen
  const setOpen = payload.setOpen;
  //using api to call to backend
  const res = yield call(insertDriverDepositTypeApi, driverDepositType);

  //react if have response
  if (res?.status === SUCCESS) {
    //send success message
    notification('success', 'Tạo dữ liệu tài xế thành công');
    //close create modal
    setOpen(false);
    yield put({ type: actions.GET_DRIVER_DEPOSIT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateDriverDepositType({ payload }) {
  const setOpen = payload.setOpen;

  //select driverDepositType from redux
  let { viewedDriverDepositType } = yield select(
    state => state.driverDepositType
  );
  //convert types of the old one to types of DriverDepositType
  const oldDriverDepositType = convertTypeOfDriverDepositType(
    viewedDriverDepositType
  );
  //convert types of the new one to types of DriverDepositType
  const driverDepositType = convertTypeOfDriverDepositType(payload.result);

  //compare old and new one to get fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    driverDepositType,
    oldDriverDepositType
  );

  //if no field need to update, return
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //if have field need to update, call api to update
  const res = yield call(
    updateDriverDepositTypeApi,
    fieldsNeedToUpdate,
    viewedDriverDepositType.id
  );

  //react after have response
  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu xe thành công');
    //close update modal
    setOpen(false);
    //set viewedDriverDepositType at redux to empty
    yield put({
      type: actions.UPDATE_VIEWED_DRIVER_DEPOSIT_TYPE,
      viewedDriverDepositType: {},
    });
    //get the newest driverDepositTypes at redux after update one
    yield put({ type: actions.GET_DRIVER_DEPOSIT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteDriverDepositType({ driverDepositTypeID }) {
  //call api
  const res = yield call(deleteDriverDepositTypeApi, driverDepositTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu xe thành công');
    //get the newest driverDepositTypes after delete one
    yield put({ type: actions.GET_DRIVER_DEPOSIT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedDriverDepositType({ driverDepositType }) {
  // convert driverDepositType type
  const convertedDriverDepositType =
    convertTypeOfDriverDepositType(driverDepositType);
  convertedDriverDepositType.id = driverDepositType.id;

  yield put({
    type: actions.UPDATE_VIEWED_DRIVER_DEPOSIT_TYPE,
    viewedDriverDepositType: convertedDriverDepositType,
  });
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.INSERT_DRIVER_DEPOSIT_TYPE,
      insertDriverDepositType
    ),
    yield takeEvery(
      actions.UPDATE_DRIVER_DEPOSIT_TYPE,
      updateDriverDepositType
    ),
    yield takeEvery(actions.GET_DRIVER_DEPOSIT_TYPE, getDriverDepositTypes),
    yield takeEvery(
      actions.DELETE_DRIVER_DEPOSIT_TYPE,
      deleteDriverDepositType
    ),
    yield takeEvery(
      actions.SET_VIEWED_DRIVER_DEPOSIT_TYPE,
      setViewedDriverDepositType
    ),
  ]);
}
