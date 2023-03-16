import { all, takeEvery } from 'redux-saga/effects';

import supplierQuoteActions from './service/supplierQuote/actions';
import {
  getSupplierQuotes,
  insertSupplierQuote,
  updateSupplierQuote,
  deleteSupplierQuote,
  viewedSupplierQuote,
  getSuppliers,
  getEquipments,
  getServiceTypes,
  approveSupplierQuote,
  getApproverOptions,
} from './service/supplierQuote/sagaHandle';
export default function* rootSaga() {
  yield all([
    //supplierQuote
    yield takeEvery(supplierQuoteActions.GET_SUPPLIER_QUOTE, getSupplierQuotes),
    yield takeEvery(
      supplierQuoteActions.INSERT_SUPPLIER_QUOTE,
      insertSupplierQuote
    ),
    yield takeEvery(
      supplierQuoteActions.UPDATE_SUPPLIER_QUOTE,
      updateSupplierQuote
    ),
    yield takeEvery(
      supplierQuoteActions.DELETE_SUPPLIER_QUOTE,
      deleteSupplierQuote
    ),
    yield takeEvery(
      supplierQuoteActions.SET_VIEWED_SUPPLIER_QUOTE,
      viewedSupplierQuote
    ),
    yield takeEvery(
      supplierQuoteActions.GET_APPROVER_IN_SUPPLIER_QUOTE,
      getApproverOptions
    ),
    //get options
    yield takeEvery(
      supplierQuoteActions.GET_SUPPLIER_IN_SUPPLIER_QUOTE,
      getSuppliers
    ),
    yield takeEvery(
      supplierQuoteActions.GET_EQUIPMENT_IN_SUPPLIER_QUOTE,
      getEquipments
    ),
    yield takeEvery(
      supplierQuoteActions.GET_SERVICE_TYPE_IN_SUPPLIER_QUOTE,
      getServiceTypes
    ),
    //approve
    yield takeEvery(
      supplierQuoteActions.APPROVE_SUPPLIER_QUOTE,
      approveSupplierQuote
    ),
  ]);
}
