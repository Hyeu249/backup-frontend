import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getFuelPriceQuotesApi,
  insertFuelPriceQuoteApi,
  updateFuelPriceQuoteApi,
  deleteFuelPriceQuoteApi,
  getFuelPriceQuoteByIdApi,
  approveFuelPriceQuoteApi,
  //
} from './apis';

import { getFuelsApi } from '@iso/vex_redux/fuel/apis';
import { getSuppliersApi } from '@iso/vex_redux/supplier//service/supplier/apis';
import { getApproversByObjectApi } from '@iso/vex_redux/globalApi';

import { convertTypeOfFuelPriceQuote } from '@iso/vex_redux/fuelPriceQuote/helpFunction';
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

export function* getFuelPriceQuotes() {
  const res = yield call(getFuelPriceQuotesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const fuelPriceQuotes = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_FUEL_PRICE_QUOTE, fuelPriceQuotes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getFuels() {
  const res = yield call(getFuelsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const fuels = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_FUEL_IN_FUEL_PRICE_QUOTE, fuels });
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
      type: actions.LOAD_SUPPLIER_IN_FUEL_PRICE_QUOTE,
      suppliers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertFuelPriceQuote({ payload }) {
  const fuelPriceQuote = convertTypeOfFuelPriceQuote({
    rawValue: payload.result,
  });
  console.log('fuelPriceQuote', fuelPriceQuote);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertFuelPriceQuoteApi, fuelPriceQuote);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_FUEL_PRICE_QUOTE });
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

export function* updateFuelPriceQuote({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedFuelPriceQuote } = yield select(state => state.fuelPriceQuote);
  const oldFuelPriceQuote = convertTypeOfFuelPriceQuote({
    rawValue: viewedFuelPriceQuote,
    listId: false,
  });
  const fuelPriceQuote = convertTypeOfFuelPriceQuote({
    rawValue: payload.result,
    listId: false,
  });

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    fuelPriceQuote,
    oldFuelPriceQuote
  );
  fieldsNeedToUpdate.approver_id_list = payload.result.approver_id_list;

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateFuelPriceQuoteApi,
    fieldsNeedToUpdate,
    viewedFuelPriceQuote.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_FUEL_PRICE_QUOTE,
      payload: { fuelPriceQuoteID: viewedFuelPriceQuote.id },
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

export function* deleteFuelPriceQuote(a) {
  //api
  const res = yield call(deleteFuelPriceQuoteApi, a.fuelPriceQuoteID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_FUEL_PRICE_QUOTE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedFuelPriceQuote({ payload }) {
  const fuelPriceQuoteID = payload.fuelPriceQuoteID;
  const res = yield call(getFuelPriceQuoteByIdApi, fuelPriceQuoteID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const result = cloneDeep(value.result);
    // //assign approver_id_list
    result.approver_id_list = result.approver_list.map(
      approver => approver.user_id
    );
    const fuelPriceQuote = convertTypeOfFuelPriceQuote({
      rawValue: result,
    });
    fuelPriceQuote.id = payload.fuelPriceQuoteID;
    yield put({
      type: actions.UPDATE_VIEWED_FUEL_PRICE_QUOTE,
      viewedFuelPriceQuote: fuelPriceQuote,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* approveFuelPriceQuote(payload) {
  //api
  const res = yield call(approveFuelPriceQuoteApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({ type: actions.GET_FUEL_PRICE_QUOTE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getApproverOptions() {
  const res = yield call(getApproversByObjectApi, 'fuel-price-quote');

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const approvers = toValueLabelObjectArray(
      value?.result?.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );
    yield put({
      type: actions.LOAD_APPROVER_IN_FUEL_PRICE_QUOTE,
      approvers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
