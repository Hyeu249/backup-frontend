import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getTyrePriceQuotesApi,
  insertTyrePriceQuoteApi,
  updateTyrePriceQuoteApi,
  deleteTyrePriceQuoteApi,
  getTyrePriceQuoteByIdApi,
  approveTyrePriceQuoteApi,
  //
} from './apis';

import { getTyresApi } from '@iso/vex_redux/tyre/service/tyre/apis';
import { getSuppliersApi } from '@iso/vex_redux/supplier//service/supplier/apis';
import { getApproversByObjectApi } from '@iso/vex_redux/globalApi';

import { convertTypeOfTyrePriceQuote } from '@iso/vex_redux/tyrePriceQuote/helpFunction';
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

export function* getTyrePriceQuotes() {
  const res = yield call(getTyrePriceQuotesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const tyrePriceQuotes = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_TYRE_PRICE_QUOTE, tyrePriceQuotes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getTyres() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getTyresApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const tyres = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_TYRE_IN_TYRE_PRICE_QUOTE, tyres });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getSuppliers() {
  const res = yield call(getSuppliersApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const suppliers = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_SUPPLIER_IN_TYRE_PRICE_QUOTE,
      suppliers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertTyrePriceQuote({ payload }) {
  const tyrePriceQuote = convertTypeOfTyrePriceQuote({
    rawValue: payload.result,
  });
  console.log('tyrePriceQuote', tyrePriceQuote);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertTyrePriceQuoteApi, tyrePriceQuote);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_TYRE_PRICE_QUOTE });
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

export function* updateTyrePriceQuote({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedTyrePriceQuote } = yield select(state => state.tyrePriceQuote);
  const oldTyrePriceQuote = convertTypeOfTyrePriceQuote({
    rawValue: viewedTyrePriceQuote,
    listId: false,
  });
  const tyrePriceQuote = convertTypeOfTyrePriceQuote({
    rawValue: payload.result,
    listId: false,
  });

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    tyrePriceQuote,
    oldTyrePriceQuote
  );
  fieldsNeedToUpdate.approver_id_list = payload.result.approver_id_list;

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateTyrePriceQuoteApi,
    fieldsNeedToUpdate,
    viewedTyrePriceQuote.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_TYRE_PRICE_QUOTE,
      payload: { tyrePriceQuoteID: viewedTyrePriceQuote.id },
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

export function* deleteTyrePriceQuote(a) {
  //api
  const res = yield call(deleteTyrePriceQuoteApi, a.tyrePriceQuoteID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_TYRE_PRICE_QUOTE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedTyrePriceQuote({ payload }) {
  const tyrePriceQuoteID = payload.tyrePriceQuoteID;
  const res = yield call(getTyrePriceQuoteByIdApi, tyrePriceQuoteID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const result = cloneDeep(value.result);
    // //assign approver_id_list
    result.approver_id_list = result.approver_list.map(
      approver => approver.user_id
    );
    const tyrePriceQuote = convertTypeOfTyrePriceQuote({
      rawValue: result,
    });
    tyrePriceQuote.id = payload.tyrePriceQuoteID;

    yield put({
      type: actions.UPDATE_VIEWED_TYRE_PRICE_QUOTE,
      viewedTyrePriceQuote: tyrePriceQuote,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* approveTyrePriceQuote(payload) {
  //api
  const res = yield call(approveTyrePriceQuoteApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({ type: actions.GET_TYRE_PRICE_QUOTE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getApproverOptions() {
  const res = yield call(getApproversByObjectApi, 'tyre-price-quote');

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const approvers = toValueLabelObjectArray(
      value?.result?.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );
    yield put({
      type: actions.LOAD_APPROVER_IN_TYRE_PRICE_QUOTE,
      approvers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
