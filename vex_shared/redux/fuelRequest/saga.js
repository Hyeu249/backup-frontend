import { all, takeEvery } from 'redux-saga/effects';

import fuelRequestActions from './service/fuelRequest/actions';
import {
  getFuelRequests,
  insertFuelRequest,
  updateFuelRequest,
  deleteFuelRequest,
  viewedFuelRequest,
  getVehicles,
  getDrivers,
  getFuelPriceQuotes,
  approveFuelRequest,
  getApproverOptions,
} from './service/fuelRequest/sagaHandle';
export default function* rootSaga() {
  yield all([
    //fuelRequest
    yield takeEvery(fuelRequestActions.GET_FUEL_REQUEST, getFuelRequests),
    yield takeEvery(fuelRequestActions.INSERT_FUEL_REQUEST, insertFuelRequest),
    yield takeEvery(fuelRequestActions.UPDATE_FUEL_REQUEST, updateFuelRequest),
    yield takeEvery(fuelRequestActions.DELETE_FUEL_REQUEST, deleteFuelRequest),
    yield takeEvery(
      fuelRequestActions.SET_VIEWED_FUEL_REQUEST,
      viewedFuelRequest
    ),
    //get options
    yield takeEvery(
      fuelRequestActions.GET_VEHICLE_IN_FUEL_REQUEST,
      getVehicles
    ),
    yield takeEvery(fuelRequestActions.GET_DRIVER_IN_FUEL_REQUEST, getDrivers),
    yield takeEvery(
      fuelRequestActions.GET_FUEL_PRICE_QUOTE_IN_FUEL_REQUEST,
      getFuelPriceQuotes
    ),
    yield takeEvery(
      fuelRequestActions.GET_APPROVER_IN_FUEL_REQUEST,
      getApproverOptions
    ),
    //approve
    yield takeEvery(
      fuelRequestActions.APPROVE_FUEL_REQUEST,
      approveFuelRequest
    ),
  ]);
}
