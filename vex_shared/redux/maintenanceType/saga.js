import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getMaintenanceTypesApi,
  insertMaintenanceTypeApi,
  updateMaintenanceTypeApi,
  deleteMaintenanceTypeApi,
  getMaintenanceTypeByIdApi,
  jsonApi,
  blobApi,
} from './apis';

import { convertTypeOfMaintenanceType } from './helpFunction';

import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
} from '@iso/vex_redux/helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getMaintenanceTypes() {
  //call api
  const res = yield call(getMaintenanceTypesApi);

  //react if have response
  if (res?.status === SUCCESS) {
    //parse json
    const value = yield call(jsonApi, res);
    //adding key field to every object value
    const maintenanceTypes = addKeyByIdToObjectArray(value?.result);
    //load maintenanceTypes to redux
    yield put({ type: actions.LOAD_MAINTENANCE_TYPE, maintenanceTypes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertMaintenanceType(a) {
  //convert types to types of MaintenanceType
  const maintenanceType = convertTypeOfMaintenanceType(a.payload.result);
  //get setOpen
  const setOpen = a.payload.setOpen;
  //using api to call to backend
  const res = yield call(insertMaintenanceTypeApi, maintenanceType);

  //react if have response
  if (res?.status === SUCCESS) {
    //send success message
    notification('success', 'Tạo dữ liệu thành công');
    //close create modal
    setOpen(false);
    yield put({ type: actions.GET_MAINTENANCE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateMaintenanceType(a) {
  const setOpen = a.payload.setOpen;

  //select maintenanceType from redux
  let { viewedMaintenanceType } = yield select(state => state.maintenanceType);
  //convert types of the old one to types of MaintenanceType
  const oldMaintenanceType = convertTypeOfMaintenanceType(
    viewedMaintenanceType
  );
  //convert types of the new one to types of MaintenanceType
  const maintenanceType = convertTypeOfMaintenanceType(a.payload.result);

  //compare old and new one to get fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    maintenanceType,
    oldMaintenanceType
  );

  //if no field need to update, return
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //if have field need to update, call api to update
  const res = yield call(
    updateMaintenanceTypeApi,
    fieldsNeedToUpdate,
    viewedMaintenanceType.id
  );

  //react after have response
  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    //close update modal
    setOpen(false);
    //set viewedMaintenanceType at redux to empty
    yield put({ type: actions.REMOVE_VIEWED_MAINTENANCE_TYPE });
    //get the newest maintenanceTypes at redux after update one
    yield put({ type: actions.GET_MAINTENANCE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteMaintenanceType(a) {
  //call api
  const res = yield call(deleteMaintenanceTypeApi, a.maintenanceTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    //get the newest maintenanceTypes after delete one
    yield put({ type: actions.GET_MAINTENANCE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedMaintenanceType({ payload }) {
  //declare variables
  const maintenanceTypeID = payload.maintenanceTypeID;
  const setOpen = payload.setOpen;

  //call api
  const res = yield call(getMaintenanceTypeByIdApi, maintenanceTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const maintenanceType = value.result;

    // convert maintenanceType type
    const convertedMaintenanceType =
      convertTypeOfMaintenanceType(maintenanceType);
    convertedMaintenanceType.id = maintenanceType.id;

    //open edit modal
    setOpen(true);
    //set redux state
    yield put({
      type: actions.UPDATE_VIEWED_MAINTENANCE_TYPE,
      viewedMaintenanceType: convertedMaintenanceType,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.INSERT_MAINTENANCE_TYPE, insertMaintenanceType),
    yield takeEvery(actions.UPDATE_MAINTENANCE_TYPE, updateMaintenanceType),
    yield takeEvery(actions.GET_MAINTENANCE_TYPE, getMaintenanceTypes),
    yield takeEvery(actions.DELETE_MAINTENANCE_TYPE, deleteMaintenanceType),
    yield takeEvery(
      actions.SET_VIEWED_MAINTENANCE_TYPE,
      setViewedMaintenanceType
    ),
  ]);
}
