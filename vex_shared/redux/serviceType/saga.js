import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getServiceTypesApi,
  insertServiceTypeApi,
  updateServiceTypeApi,
  deleteServiceTypeApi,
  getServiceTypeByIdApi,
} from './apis';

import { convertTypeOfServiceType } from './helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  jsonApi,
  blobApi,
} from '@iso/vex_redux/helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getServiceTypes() {
  //call api
  const res = yield call(getServiceTypesApi);

  //react if have response
  if (res?.status === SUCCESS) {
    //parse json
    const value = yield call(jsonApi, res);
    //adding key field to every object value
    const serviceTypes = addKeyByIdToObjectArray(value?.result);
    //load serviceTypes to redux
    yield put({ type: actions.LOAD_SERVICE_TYPE, serviceTypes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertServiceType(a) {
  //convert types to types of ServiceType
  const serviceType = convertTypeOfServiceType(a.payload.result);
  //get setOpen
  const setOpen = a.payload.setOpen;
  //using api to call to backend
  const res = yield call(insertServiceTypeApi, serviceType);

  //react if have response
  if (res?.status === SUCCESS) {
    //send success message
    notification('success', 'Tạo dữ liệu thành công');
    //close create modal
    setOpen(false);
    yield put({ type: actions.GET_SERVICE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateServiceType(a) {
  const setOpen = a.payload.setOpen;

  //select serviceType from redux
  let { viewedServiceType } = yield select(state => state.serviceType);
  //convert types of the old one to types of ServiceType
  const oldServiceType = convertTypeOfServiceType(viewedServiceType);
  //convert types of the new one to types of ServiceType
  const serviceType = convertTypeOfServiceType(a.payload.result);

  //compare old and new one to get fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(serviceType, oldServiceType);

  //if no field need to update, return
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //if have field need to update, call api to update
  const res = yield call(
    updateServiceTypeApi,
    fieldsNeedToUpdate,
    viewedServiceType.id
  );

  //react after have response
  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    //close update modal
    setOpen(false);
    //set viewedServiceType at redux to empty
    yield put({ type: actions.REMOVE_VIEWED_SERVICE_TYPE });
    //get the newest serviceTypes at redux after update one
    yield put({ type: actions.GET_SERVICE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteServiceType(a) {
  //call api
  const res = yield call(deleteServiceTypeApi, a.serviceTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    //get the newest serviceTypes after delete one
    yield put({ type: actions.GET_SERVICE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedServiceType({ payload }) {
  //declare variables
  const serviceTypeID = payload.serviceTypeID;
  const setOpen = payload.setOpen;

  //call api
  const res = yield call(getServiceTypeByIdApi, serviceTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const serviceType = value.result;

    // convert serviceType type
    const convertedServiceType = convertTypeOfServiceType(serviceType);
    convertedServiceType.id = serviceType.id;

    //open edit modal
    setOpen(true);
    //set redux state
    yield put({
      type: actions.UPDATE_VIEWED_SERVICE_TYPE,
      viewedServiceType: convertedServiceType,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.INSERT_SERVICE_TYPE, insertServiceType),
    yield takeEvery(actions.UPDATE_SERVICE_TYPE, updateServiceType),
    yield takeEvery(actions.GET_SERVICE_TYPE, getServiceTypes),
    yield takeEvery(actions.DELETE_SERVICE_TYPE, deleteServiceType),
    yield takeEvery(actions.SET_VIEWED_SERVICE_TYPE, setViewedServiceType),
  ]);
}
