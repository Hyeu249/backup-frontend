import { all, takeEvery } from 'redux-saga/effects';

import supplierActions from './service/supplier/actions';
import {
  getSuppliers,
  insertSupplier,
  updateSupplier,
  deleteSupplier,
  viewedSupplier,
} from './service/supplier/sagaHandle';
export default function* rootSaga() {
  yield all([
    //supplier
    yield takeEvery(supplierActions.GET_SUPPLIER, getSuppliers),
    yield takeEvery(supplierActions.INSERT_SUPPLIER, insertSupplier),
    yield takeEvery(supplierActions.UPDATE_SUPPLIER, updateSupplier),
    yield takeEvery(supplierActions.DELETE_SUPPLIER, deleteSupplier),
    yield takeEvery(supplierActions.SET_VIEWED_SUPPLIER, viewedSupplier),
  ]);
}
