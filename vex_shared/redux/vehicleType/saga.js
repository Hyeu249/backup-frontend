import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getVehicleTypesApi,
  insertVehicleTypeApi,
  updateVehicleTypeApi,
  deleteVehicleTypeApi,
  getVehicleTypeByIdApi,
  jsonApi,
  blobApi,
} from './apis';

import {
  convertTypeOfVehicleType,
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
} from './helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getVehicleTypes() {
  //call api
  const res = yield call(getVehicleTypesApi);

  //react if have response
  if (res?.status === SUCCESS) {
    //parse json
    const value = yield call(jsonApi, res);
    //adding key field to every object value
    const vehicleTypes = addKeyByIdToObjectArray(value?.result);
    //load vehicleTypes to redux
    yield put({ type: actions.LOAD_VEHICLE_TYPE, vehicleTypes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertVehicleType(a) {
  //convert types to types of VehicleType
  const vehicleType = convertTypeOfVehicleType(a.payload.result);
  //get setOpen
  const setOpen = a.payload.setOpen;
  //using api to call to backend
  const res = yield call(insertVehicleTypeApi, vehicleType);

  //react if have response
  if (res?.status === SUCCESS) {
    //send success message
    notification('success', 'Tạo dữ liệu thành công');
    //close create modal
    setOpen(false);
    yield put({ type: actions.GET_VEHICLE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateVehicleType(a) {
  const setOpen = a.payload.setOpen;

  //select vehicleType from redux
  let { viewedVehicleType } = yield select(state => state.vehicleType);
  //convert types of the old one to types of VehicleType
  const oldVehicleType = convertTypeOfVehicleType(viewedVehicleType);
  //convert types of the new one to types of VehicleType
  const vehicleType = convertTypeOfVehicleType(a.payload.result);

  //compare old and new one to get fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(vehicleType, oldVehicleType);

  //if no field need to update, return
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //if have field need to update, call api to update
  const res = yield call(
    updateVehicleTypeApi,
    fieldsNeedToUpdate,
    viewedVehicleType.id
  );

  //react after have response
  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    //close update modal
    setOpen(false);
    //set viewedVehicleType at redux to empty
    yield put({ type: actions.REMOVE_VIEWED_VEHICLE_TYPE });
    //get the newest vehicleTypes at redux after update one
    yield put({ type: actions.GET_VEHICLE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteVehicleType(a) {
  //call api
  const res = yield call(deleteVehicleTypeApi, a.vehicleTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    //get the newest vehicleTypes after delete one
    yield put({ type: actions.GET_VEHICLE_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedVehicleType({ payload }) {
  //declare variables
  const vehicleTypeID = payload.vehicleTypeID;
  const setOpen = payload.setOpen;

  //call api
  const res = yield call(getVehicleTypeByIdApi, vehicleTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const vehicleType = value.result;

    // convert vehicleType type
    const convertedVehicleType = convertTypeOfVehicleType(vehicleType);
    convertedVehicleType.id = vehicleType.id;

    //open edit modal
    setOpen(true);
    //set redux state
    yield put({
      type: actions.UPDATE_VIEWED_VEHICLE_TYPE,
      viewedVehicleType: convertedVehicleType,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.INSERT_VEHICLE_TYPE, insertVehicleType),
    yield takeEvery(actions.UPDATE_VEHICLE_TYPE, updateVehicleType),
    yield takeEvery(actions.GET_VEHICLE_TYPE, getVehicleTypes),
    yield takeEvery(actions.DELETE_VEHICLE_TYPE, deleteVehicleType),
    yield takeEvery(actions.SET_VIEWED_VEHICLE_TYPE, setViewedVehicleType),
  ]);
}
