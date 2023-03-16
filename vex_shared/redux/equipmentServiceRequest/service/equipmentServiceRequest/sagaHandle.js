import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getEquipmentServiceRequestsApi,
  insertEquipmentServiceRequestApi,
  updateEquipmentServiceRequestApi,
  deleteEquipmentServiceRequestApi,
  getEquipmentServiceRequestByIdApi,
  //
} from './apis';
import { getSupplierQuotesApi } from '@iso/vex_redux/supplierQuote/service/supplierQuote/apis';
import { convertTypeOfEquipmentServiceRequest } from '@iso/vex_redux/equipmentServiceRequest/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  callSetErrFieldsWhenHaveErr,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getEquipmentServiceRequests() {
  const res = yield call(getEquipmentServiceRequestsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const equipmentServiceRequests = addKeyByIdToObjectArray(value?.result);
    yield put({
      type: actions.LOAD_EQUIPMENT_SERVICE_REQUEST,
      equipmentServiceRequests,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getSupplierOptions() {
  const res = yield call(getSupplierQuotesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const supplierQuotes = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST,
      supplierQuotes,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* insertEquipmentServiceRequest({ payload }) {
  const equipmentServiceRequest = convertTypeOfEquipmentServiceRequest(
    payload.result
  );
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(
    insertEquipmentServiceRequestApi,
    equipmentServiceRequest
  );

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_EQUIPMENT_SERVICE_REQUEST });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateEquipmentServiceRequest({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedEquipmentServiceRequest } = yield select(
    state => state.equipmentServiceRequest
  );
  const oldEquipmentServiceRequest = convertTypeOfEquipmentServiceRequest(
    viewedEquipmentServiceRequest
  );
  const equipmentServiceRequest = convertTypeOfEquipmentServiceRequest(
    payload.result
  );

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    equipmentServiceRequest,
    oldEquipmentServiceRequest
  );

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateEquipmentServiceRequestApi,
    fieldsNeedToUpdate,
    viewedEquipmentServiceRequest.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_EQUIPMENT_SERVICE_REQUEST,
      payload: { equipmentServiceRequestID: viewedEquipmentServiceRequest.id },
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteEquipmentServiceRequest(a) {
  //api
  const res = yield call(
    deleteEquipmentServiceRequestApi,
    a.equipmentServiceRequestID
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_EQUIPMENT_SERVICE_REQUEST });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedEquipmentServiceRequest({ payload }) {
  const equipmentServiceRequestID = payload.equipmentServiceRequestID;
  const res = yield call(
    getEquipmentServiceRequestByIdApi,
    equipmentServiceRequestID
  );
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const equipmentServiceRequest = convertTypeOfEquipmentServiceRequest(
      value.result
    );
    equipmentServiceRequest.id = payload.equipmentServiceRequestID;

    yield put({
      type: actions.UPDATE_VIEWED_EQUIPMENT_SERVICE_REQUEST,
      viewedEquipmentServiceRequest: equipmentServiceRequest,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
