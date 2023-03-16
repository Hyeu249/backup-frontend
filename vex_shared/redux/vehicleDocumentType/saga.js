import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getVehicleDocumentTypesApi,
  insertVehicleDocumentTypeApi,
  updateVehicleDocumentTypeApi,
  deleteVehicleDocumentTypeApi,
  getVehicleDocumentTypeByIdApi,
} from './apis';

import { convertTypeOfVehicleDocumentType } from './helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  jsonApi,
  blobApi,
} from '@iso/vex_redux/helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getVehicleDocumentTypes() {
  //call api
  const res = yield call(getVehicleDocumentTypesApi);

  //react if have response
  if (res?.status === SUCCESS) {
    //parse json
    const value = yield call(jsonApi, res);
    //adding key field to every object value
    const vehicleDocumentTypes = addKeyByIdToObjectArray(value?.result);
    //load vehicleDocumentTypes to redux
    yield put({
      type: actions.LOAD_VEHICLE_DOCUMENT_TYPE,
      vehicleDocumentTypes,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertVehicleDocumentType(a) {
  //convert types to types of VehicleDocumentType
  const vehicleDocumentType = convertTypeOfVehicleDocumentType(
    a.payload.result
  );
  //get setOpen
  const setOpen = a.payload.setOpen;
  //using api to call to backend
  const res = yield call(insertVehicleDocumentTypeApi, vehicleDocumentType);

  //react if have response
  if (res?.status === SUCCESS) {
    //send success message
    notification('success', 'Tạo dữ liệu thành công');
    //close create modal
    setOpen(false);
    yield put({ type: actions.GET_VEHICLE_DOCUMENT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateVehicleDocumentType(a) {
  const setOpen = a.payload.setOpen;

  //select vehicleDocumentType from redux
  let { viewedVehicleDocumentType } = yield select(
    state => state.vehicleDocumentType
  );
  //convert types of the old one to types of VehicleDocumentType
  const oldVehicleDocumentType = convertTypeOfVehicleDocumentType(
    viewedVehicleDocumentType
  );
  //convert types of the new one to types of VehicleDocumentType
  const vehicleDocumentType = convertTypeOfVehicleDocumentType(
    a.payload.result
  );

  //compare old and new one to get fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    vehicleDocumentType,
    oldVehicleDocumentType
  );

  //if no field need to update, return
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //if have field need to update, call api to update
  const res = yield call(
    updateVehicleDocumentTypeApi,
    fieldsNeedToUpdate,
    viewedVehicleDocumentType.id
  );

  //react after have response
  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    //close update modal
    setOpen(false);
    //set viewedVehicleDocumentType at redux to empty
    yield put({ type: actions.REMOVE_VIEWED_VEHICLE_DOCUMENT_TYPE });
    //get the newest vehicleDocumentTypes at redux after update one
    yield put({ type: actions.GET_VEHICLE_DOCUMENT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteVehicleDocumentType(a) {
  //call api
  const res = yield call(deleteVehicleDocumentTypeApi, a.vehicleDocumentTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    //get the newest vehicleDocumentTypes after delete one
    yield put({ type: actions.GET_VEHICLE_DOCUMENT_TYPE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedVehicleDocumentType({ payload }) {
  //declare variables
  const vehicleDocumentTypeID = payload.vehicleDocumentTypeID;
  const setOpen = payload.setOpen;

  //call api
  const res = yield call(getVehicleDocumentTypeByIdApi, vehicleDocumentTypeID);

  //react if have response
  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const vehicleDocumentType = value.result;

    // convert vehicleDocumentType type
    const convertedVehicleDocumentType =
      convertTypeOfVehicleDocumentType(vehicleDocumentType);
    convertedVehicleDocumentType.id = vehicleDocumentType.id;

    //open edit modal
    setOpen(true);
    //set redux state
    yield put({
      type: actions.UPDATE_VIEWED_VEHICLE_DOCUMENT_TYPE,
      viewedVehicleDocumentType: convertedVehicleDocumentType,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.INSERT_VEHICLE_DOCUMENT_TYPE,
      insertVehicleDocumentType
    ),
    yield takeEvery(
      actions.UPDATE_VEHICLE_DOCUMENT_TYPE,
      updateVehicleDocumentType
    ),
    yield takeEvery(actions.GET_VEHICLE_DOCUMENT_TYPE, getVehicleDocumentTypes),
    yield takeEvery(
      actions.DELETE_VEHICLE_DOCUMENT_TYPE,
      deleteVehicleDocumentType
    ),
    yield takeEvery(
      actions.SET_VIEWED_VEHICLE_DOCUMENT_TYPE,
      setViewedVehicleDocumentType
    ),
  ]);
}
