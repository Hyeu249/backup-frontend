import { all, takeEvery } from 'redux-saga/effects';

import contractActions from './service/contract/actions';
import {
  getContracts,
  getSuppliers,
  insertContract,
  updateContract,
  deleteContract,
  viewedContract,
  approveContract,
  getApproverOptions,
} from './service/contract/sagaHandle';
export default function* rootSaga() {
  yield all([
    //contract
    yield takeEvery(contractActions.GET_CONTRACT, getContracts),
    yield takeEvery(contractActions.GET_SUPPLIER_IN_CONTRACT, getSuppliers),
    yield takeEvery(contractActions.INSERT_CONTRACT, insertContract),
    yield takeEvery(contractActions.UPDATE_CONTRACT, updateContract),
    yield takeEvery(contractActions.DELETE_CONTRACT, deleteContract),
    yield takeEvery(contractActions.SET_VIEWED_CONTRACT, viewedContract),
    yield takeEvery(contractActions.APPROVE_CONTRACT, approveContract),
    yield takeEvery(
      contractActions.GET_APPROVER_IN_CONTRACT,
      getApproverOptions
    ),
  ]);
}
