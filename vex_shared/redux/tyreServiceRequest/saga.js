import { all, takeEvery } from 'redux-saga/effects';

import tyreServiceRequestActions from './service/tyreServiceRequest/actions';
import {
  getTyreServiceRequests,
  insertTyreServiceRequest,
  updateTyreServiceRequest,
  deleteTyreServiceRequest,
  viewedTyreServiceRequest,
  getTyrePriceQuotes,
} from './service/tyreServiceRequest/sagaHandle';
export default function* rootSaga() {
  yield all([
    //tyreServiceRequest
    yield takeEvery(
      tyreServiceRequestActions.GET_TYRE_SERVICE_REQUEST,
      getTyreServiceRequests
    ),
    yield takeEvery(
      tyreServiceRequestActions.INSERT_TYRE_SERVICE_REQUEST,
      insertTyreServiceRequest
    ),
    yield takeEvery(
      tyreServiceRequestActions.UPDATE_TYRE_SERVICE_REQUEST,
      updateTyreServiceRequest
    ),
    yield takeEvery(
      tyreServiceRequestActions.DELETE_TYRE_SERVICE_REQUEST,
      deleteTyreServiceRequest
    ),
    yield takeEvery(
      tyreServiceRequestActions.SET_VIEWED_TYRE_SERVICE_REQUEST,
      viewedTyreServiceRequest
    ),
    //get options
    yield takeEvery(
      tyreServiceRequestActions.GET_TYRE_PRICE_QUOTE_IN_TYRE_SERVICE_REQUEST,
      getTyrePriceQuotes
    ),
  ]);
}
