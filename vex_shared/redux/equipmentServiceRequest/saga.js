import { all, takeEvery } from 'redux-saga/effects';

import equipmentServiceRequestActions from './service/equipmentServiceRequest/actions';
import {
  getEquipmentServiceRequests,
  insertEquipmentServiceRequest,
  updateEquipmentServiceRequest,
  deleteEquipmentServiceRequest,
  viewedEquipmentServiceRequest,
  getSupplierOptions,
} from './service/equipmentServiceRequest/sagaHandle';
export default function* rootSaga() {
  yield all([
    //equipmentServiceRequest
    yield takeEvery(
      equipmentServiceRequestActions.GET_EQUIPMENT_SERVICE_REQUEST,
      getEquipmentServiceRequests
    ),
    yield takeEvery(
      equipmentServiceRequestActions.INSERT_EQUIPMENT_SERVICE_REQUEST,
      insertEquipmentServiceRequest
    ),
    yield takeEvery(
      equipmentServiceRequestActions.UPDATE_EQUIPMENT_SERVICE_REQUEST,
      updateEquipmentServiceRequest
    ),
    yield takeEvery(
      equipmentServiceRequestActions.DELETE_EQUIPMENT_SERVICE_REQUEST,
      deleteEquipmentServiceRequest
    ),
    yield takeEvery(
      equipmentServiceRequestActions.SET_VIEWED_EQUIPMENT_SERVICE_REQUEST,
      viewedEquipmentServiceRequest
    ),
    //get options
    yield takeEvery(
      equipmentServiceRequestActions.GET_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST,
      getSupplierOptions
    ),
  ]);
}
