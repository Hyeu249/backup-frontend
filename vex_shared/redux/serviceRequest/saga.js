import { all, takeEvery } from 'redux-saga/effects';

import serviceRequestActions from './service/serviceRequest/actions';
import {
  getServiceRequests,
  insertServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
  viewedServiceRequest,
  getDriverOptions,
  getVehicleOptions,
  getEquipmentServiceRequestOptions,
  getTyreServiceRequestOptions,
  getApproverOptions,
  approveContract,
} from './service/serviceRequest/sagaHandle';
export default function* rootSaga() {
  yield all([
    //serviceRequest
    yield takeEvery(
      serviceRequestActions.INSERT_SERVICE_REQUEST,
      insertServiceRequest
    ),
    yield takeEvery(
      serviceRequestActions.UPDATE_SERVICE_REQUEST,
      updateServiceRequest
    ),
    yield takeEvery(
      serviceRequestActions.DELETE_SERVICE_REQUEST,
      deleteServiceRequest
    ),
    yield takeEvery(
      serviceRequestActions.GET_SERVICE_REQUEST,
      getServiceRequests
    ),
    yield takeEvery(
      serviceRequestActions.SET_VIEWED_SERVICE_REQUEST,
      viewedServiceRequest
    ),
    //get options
    yield takeEvery(
      serviceRequestActions.GET_DRIVER_IN_SERVICE_REQUEST,
      getDriverOptions
    ),
    yield takeEvery(
      serviceRequestActions.GET_VEHICLE_IN_SERVICE_REQUEST,
      getVehicleOptions
    ),
    yield takeEvery(
      serviceRequestActions.GET_EQUIPMENT_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      getEquipmentServiceRequestOptions
    ),
    yield takeEvery(
      serviceRequestActions.GET_TYRE_SERVICE_REQUEST_IN_SERVICE_REQUEST,
      getTyreServiceRequestOptions
    ),
    yield takeEvery(
      serviceRequestActions.GET_APPROVER_IN_SERVICE_REQUEST,
      getApproverOptions
    ),
    yield takeEvery(
      serviceRequestActions.APPROVE_CONTRACT_IN_SERVICE_REQUEST,
      approveContract
    ),
  ]);
}
