import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  GetDocumentListByVehicle,
  insertVehicleDocumentApi,
  deleteVehicleDocumentApi,
  getVehicleDocumentByIdApi,
  //
} from './apis';
import {
  getVehicleDocumentTypesApi,
  getVehicleDocumentTypeByIdApi,
} from '@iso/vex_redux/vehicleDocumentType/apis';
import { convertTypeOfVehicleDocument } from '@iso/vex_redux/vehicle/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getVehicleDocuments({ vehicleId }) {
  const res = yield call(GetDocumentListByVehicle, vehicleId);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const vehicleDocuments = addKeyByIdToObjectArray(value?.result);
    for (const [i, raw] of vehicleDocuments.entries()) {
      const data = cloneDeep(raw);
      const documentTypeRes = yield call(
        getVehicleDocumentTypeByIdApi,
        data.vehicle_document_type_id
      );
      if (documentTypeRes.status === SUCCESS) {
        const documentTypeValue = yield call(jsonApi, documentTypeRes);
        vehicleDocuments[i].value = vehicleDocuments[i].id;
        vehicleDocuments[i].label = documentTypeValue.result.name;
      } else {
        notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
      }
    }

    yield put({
      type: actions.LOAD_VEHICLE_DOCUMENT,
      vehicleDocuments,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getVehicleDocumentTypeOptions() {
  const res = yield call(getVehicleDocumentTypesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const vehicleDocumentTypes = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT,
      vehicleDocumentTypes,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* createVehicleDocument({ payload }) {
  const vehicleDocument = convertTypeOfVehicleDocument(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;

  //api call
  const res = yield call(
    insertVehicleDocumentApi,
    vehicleDocument,
    payload.result.vehicle_id
  );
  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.GET_VEHICLE_DOCUMENT,
      vehicleId: payload.result.vehicle_id,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteVehicleDocument({ id, vehicleId }) {
  //api
  const res = yield call(deleteVehicleDocumentApi, id);
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({
      type: actions.GET_VEHICLE_DOCUMENT,
      vehicleId: vehicleId,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedVehicleDocument({ payload }) {
  const id = payload.id;
  console.log('id: ', id);
  return;
  const res = yield call(getVehicleDocumentByIdApi, id);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const vehicle = convertTypeOfVehicle(value.result);
    vehicle.id = payload.vehicleID;

    yield put({
      type: actions.UPDATE_VIEWED_DRIVER,
      viewedVehicle: vehicle,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
