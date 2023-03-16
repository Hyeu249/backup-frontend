import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getSupplierQuotesApi,
  insertSupplierQuoteApi,
  updateSupplierQuoteApi,
  deleteSupplierQuoteApi,
  getSupplierQuoteByIdApi,
  approveSupplierQuoteApi,
  //
} from './apis';
import { getApproversByObjectApi } from '@iso/vex_redux/globalApi';

import { getSuppliersApi } from '@iso/vex_redux/supplier/service/supplier/apis';
import { getEquipmentsApi } from '@iso/vex_redux/equipment/service/equipment/apis';
import { getServiceTypesApi } from '@iso/vex_redux/serviceType//apis';

import { convertTypeOfSupplierQuote } from '@iso/vex_redux/supplierQuote/helpFunction';
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

export function* getSupplierQuotes() {
  const res = yield call(getSupplierQuotesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const supplierQuotes = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_SUPPLIER_QUOTE, supplierQuotes });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getSuppliers() {
  const res = yield call(getSuppliersApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const suppliers = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_SUPPLIER_IN_SUPPLIER_QUOTE, suppliers });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getEquipments() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getEquipmentsApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const equipments = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_EQUIPMENT_IN_SUPPLIER_QUOTE, equipments });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getServiceTypes() {
  const res = yield call(getServiceTypesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const serviceTypes = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_SERVICE_TYPE_IN_SUPPLIER_QUOTE,
      serviceTypes,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertSupplierQuote({ payload }) {
  const supplierQuote = convertTypeOfSupplierQuote({
    rawValue: payload.result,
  });
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertSupplierQuoteApi, supplierQuote);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_SUPPLIER_QUOTE });
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

export function* updateSupplierQuote({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedSupplierQuote } = yield select(state => state.supplierQuote);
  const oldSupplierQuote = convertTypeOfSupplierQuote({
    rawValue: viewedSupplierQuote,
    listId: false,
  });
  const supplierQuote = convertTypeOfSupplierQuote({
    rawValue: payload.result,
    listId: false,
  });

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    supplierQuote,
    oldSupplierQuote
  );
  fieldsNeedToUpdate.approver_id_list = payload.result.approver_id_list;

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateSupplierQuoteApi,
    fieldsNeedToUpdate,
    viewedSupplierQuote.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_SUPPLIER_QUOTE,
      payload: { supplierQuoteID: viewedSupplierQuote.id },
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

export function* deleteSupplierQuote(a) {
  //api
  const res = yield call(deleteSupplierQuoteApi, a.supplierQuoteID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_SUPPLIER_QUOTE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedSupplierQuote({ payload }) {
  const supplierQuoteID = payload.supplierQuoteID;
  const res = yield call(getSupplierQuoteByIdApi, supplierQuoteID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const result = cloneDeep(value.result);
    console.log('result', result);
    // //assign approver_id_list
    result.approver_id_list = result.approver_list.map(
      approver => approver.user_id
    );
    const supplierQuote = convertTypeOfSupplierQuote({
      rawValue: result,
    });
    supplierQuote.id = payload.supplierQuoteID;
    yield put({
      type: actions.UPDATE_VIEWED_SUPPLIER_QUOTE,
      viewedSupplierQuote: supplierQuote,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* approveSupplierQuote(payload) {
  //api
  const res = yield call(approveSupplierQuoteApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({ type: actions.GET_SUPPLIER_QUOTE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* approveEquipmentADriverAssignment(payload) {
  //api
  const res = yield call(approveEquipmentADriverAssignmentApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({
      type: actions.GET_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      equipmentId: payload.equipmentId,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getApproverOptions() {
  const res = yield call(getApproversByObjectApi, 'supplier-quote');

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const approvers = toValueLabelObjectArray(
      value?.result?.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );
    yield put({
      type: actions.LOAD_APPROVER_IN_SUPPLIER_QUOTE,
      approvers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
