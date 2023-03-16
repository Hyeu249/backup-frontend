import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getServiceRequestsApi,
  insertServiceRequestApi,
  updateServiceRequestApi,
  deleteServiceRequestApi,
  getServiceRequestByIdApi,
  approveServiceRequesttApi,
  //
} from './apis';
import { getApproversByObjectApi } from '@iso/vex_redux/globalApi';
import { getDriversApi } from '@iso/vex_redux/driver/service/driver/apis';
import { getVehiclesApi } from '@iso/vex_redux/vehicle/service/vehicle/apis';
import { getEquipmentServiceRequestsApi } from '@iso/vex_redux/equipmentServiceRequest/service/equipmentServiceRequest/apis';
import { getTyreServiceRequestsApi } from '@iso/vex_redux/tyreServiceRequest/service/tyreServiceRequest/apis';
import { convertTypeOfServiceRequest } from '@iso/vex_redux/serviceRequest/helpFunction';
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

export function* getServiceRequests() {
  const res = yield call(getServiceRequestsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const serviceRequests = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_SERVICE_REQUEST, serviceRequests });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getDriverOptions() {
  const res = yield call(getDriversApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const drivers = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_DRIVER_IN_SERVICE_REQUEST, drivers });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getVehicleOptions() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getVehiclesApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const vehicles = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_VEHICLE_IN_SERVICE_REQUEST, vehicles });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getEquipmentServiceRequestOptions() {
  const res = yield call(getEquipmentServiceRequestsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const equipmentServiceRequests = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      equipmentServiceRequests,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getTyreServiceRequestOptions() {
  const res = yield call(getTyreServiceRequestsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const tyreServiceRequests = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      tyreServiceRequests,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertServiceRequest({ payload }) {
  const serviceRequest = convertTypeOfServiceRequest({
    rawValue: payload.result,
  });
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertServiceRequestApi, serviceRequest);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_SERVICE_REQUEST });
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

export function* updateServiceRequest({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedServiceRequest } = yield select(state => state.serviceRequest);
  const oldServiceRequest = convertTypeOfServiceRequest({
    rawValue: viewedServiceRequest,
    listId: false,
  });
  const serviceRequest = convertTypeOfServiceRequest({
    rawValue: payload.result,
    listId: false,
  });

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    serviceRequest,
    oldServiceRequest
  );
  fieldsNeedToUpdate.approver_id_list = payload.result.approver_id_list;

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateServiceRequestApi,
    fieldsNeedToUpdate,
    viewedServiceRequest.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_SERVICE_REQUEST,
      payload: { serviceRequestID: viewedServiceRequest.id },
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

export function* deleteServiceRequest({ serviceRequestID }) {
  //api
  const res = yield call(deleteServiceRequestApi, serviceRequestID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_SERVICE_REQUEST });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedServiceRequest({ payload }) {
  const serviceRequestID = payload.serviceRequestID;
  const res = yield call(getServiceRequestByIdApi, serviceRequestID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const result = cloneDeep(value.result);
    // //assign approver_id_list
    result.approver_id_list = result.approver_list.map(
      approver => approver.user_id
    );
    const serviceRequest = convertTypeOfServiceRequest({
      rawValue: result,
    });
    serviceRequest.id = payload.serviceRequestID;

    yield put({
      type: actions.UPDATE_VIEWED_SERVICE_REQUEST,
      viewedServiceRequest: serviceRequest,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getApproverOptions() {
  const res = yield call(getApproversByObjectApi, 'service-request');

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const approvers = toValueLabelObjectArray(
      value?.result?.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );
    yield put({
      type: actions.LOAD_APPROVER_IN_SERVICE_REQUEST,
      approvers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* approveContract(payload) {
  //api
  const res = yield call(approveServiceRequesttApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({ type: actions.GET_SERVICE_REQUEST });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
