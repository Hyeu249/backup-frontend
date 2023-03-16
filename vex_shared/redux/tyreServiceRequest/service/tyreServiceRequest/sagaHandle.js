import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getTyreServiceRequestsApi,
  insertTyreServiceRequestApi,
  updateTyreServiceRequestApi,
  deleteTyreServiceRequestApi,
  getTyreServiceRequestByIdApi,
  //
} from './apis';
import { getTyrePriceQuotesApi } from '@iso/vex_redux/tyrePriceQuote/service/tyrePriceQuote/apis';
import { convertTypeOfTyreServiceRequest } from '@iso/vex_redux/tyreServiceRequest/helpFunction';
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

export function* getTyreServiceRequests() {
  const res = yield call(getTyreServiceRequestsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const tyreServiceRequests = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_TYRE_SERVICE_REQUEST, tyreServiceRequests });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getTyrePriceQuotes() {
  const res = yield call(getTyrePriceQuotesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const tyrePriceQuotes = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST,
      tyrePriceQuotes,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* insertTyreServiceRequest({ payload }) {
  const tyreServiceRequest = convertTypeOfTyreServiceRequest(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertTyreServiceRequestApi, tyreServiceRequest);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_TYRE_SERVICE_REQUEST });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateTyreServiceRequest({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedTyreServiceRequest } = yield select(
    state => state.tyreServiceRequest
  );
  const oldTyreServiceRequest = convertTypeOfTyreServiceRequest(
    viewedTyreServiceRequest
  );
  const tyreServiceRequest = convertTypeOfTyreServiceRequest(payload.result);

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    tyreServiceRequest,
    oldTyreServiceRequest
  );

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateTyreServiceRequestApi,
    fieldsNeedToUpdate,
    viewedTyreServiceRequest.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_TYRE_SERVICE_REQUEST,
      payload: { tyreServiceRequestID: viewedTyreServiceRequest.id },
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteTyreServiceRequest(a) {
  //api
  const res = yield call(deleteTyreServiceRequestApi, a.tyreServiceRequestID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_TYRE_SERVICE_REQUEST });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedTyreServiceRequest({ payload }) {
  const tyreServiceRequestID = payload.tyreServiceRequestID;
  const res = yield call(getTyreServiceRequestByIdApi, tyreServiceRequestID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const tyreServiceRequest = convertTypeOfTyreServiceRequest(value.result);
    tyreServiceRequest.id = payload.tyreServiceRequestID;

    yield put({
      type: actions.UPDATE_VIEWED_TYRE_SERVICE_REQUEST,
      viewedTyreServiceRequest: tyreServiceRequest,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
