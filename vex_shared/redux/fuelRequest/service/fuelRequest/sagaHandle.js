import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getFuelRequestsApi,
  insertFuelRequestApi,
  updateFuelRequestApi,
  deleteFuelRequestApi,
  getFuelRequestByIdApi,
  approveFuelRequestApi,
  //
} from './apis';

import { getVehiclesApi } from '@iso/vex_redux/vehicle/service/vehicle/apis';
import { getDriversApi } from '@iso/vex_redux/driver/service/driver/apis';
import { getFuelPriceQuotesApi } from '@iso/vex_redux/fuelPriceQuote/service/fuelPriceQuote/apis';
import { getApproversByObjectApi } from '@iso/vex_redux/globalApi';

import { convertTypeOfFuelRequest } from '@iso/vex_redux/fuelRequest/helpFunction';
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

export function* getFuelRequests() {
  const res = yield call(getFuelRequestsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const fuelRequests = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_FUEL_REQUEST, fuelRequests });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getVehicles() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getVehiclesApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const vehicles = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_VEHICLE_IN_FUEL_REQUEST, vehicles });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getDrivers() {
  const res = yield call(getDriversApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const drivers = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_DRIVER_IN_FUEL_REQUEST, drivers });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getFuelPriceQuotes() {
  const res = yield call(getFuelPriceQuotesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const fuelPriceQuotes = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST,
      fuelPriceQuotes,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertFuelRequest({ payload }) {
  const fuelRequest = convertTypeOfFuelRequest({ rawValue: payload.result });
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertFuelRequestApi, fuelRequest);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_FUEL_REQUEST });
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

export function* updateFuelRequest({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedFuelRequest } = yield select(state => state.fuelRequest);
  const oldFuelRequest = convertTypeOfFuelRequest({
    rawValue: viewedFuelRequest,
    listId: false,
  });
  const fuelRequest = convertTypeOfFuelRequest({
    rawValue: payload.result,
    list: false,
  });

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(fuelRequest, oldFuelRequest);
  fieldsNeedToUpdate.approver_id_list = payload.result.approver_id_list;

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateFuelRequestApi,
    fieldsNeedToUpdate,
    viewedFuelRequest.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_FUEL_REQUEST,
      payload: { fuelRequestID: viewedFuelRequest.id },
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

export function* deleteFuelRequest(a) {
  //api
  const res = yield call(deleteFuelRequestApi, a.fuelRequestID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_FUEL_REQUEST });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedFuelRequest({ payload }) {
  const fuelRequestID = payload.fuelRequestID;
  const res = yield call(getFuelRequestByIdApi, fuelRequestID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const result = cloneDeep(value.result);
    // //assign approver_id_list
    result.approver_id_list = result.approver_list.map(
      approver => approver.user_id
    );
    const fuelRequest = convertTypeOfFuelRequest({ rawValue: result });
    fuelRequest.id = payload.fuelRequestID;

    yield put({
      type: actions.UPDATE_VIEWED_FUEL_REQUEST,
      viewedFuelRequest: fuelRequest,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* approveFuelRequest(payload) {
  //api
  const res = yield call(approveFuelRequestApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({ type: actions.GET_FUEL_REQUEST });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getApproverOptions() {
  const res = yield call(getApproversByObjectApi, 'refuel-request');

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const approvers = toValueLabelObjectArray(
      value?.result?.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );
    yield put({
      type: actions.LOAD_APPROVER_IN_FUEL_REQUEST,
      approvers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
