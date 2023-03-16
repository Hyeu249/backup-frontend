import { all, takeEvery } from 'redux-saga/effects';

import tyrePriceQuoteActions from './service/tyrePriceQuote/actions';
import {
  getTyrePriceQuotes,
  insertTyrePriceQuote,
  updateTyrePriceQuote,
  deleteTyrePriceQuote,
  viewedTyrePriceQuote,
  getTyres,
  getSuppliers,
  approveTyrePriceQuote,
  getApproverOptions,
} from './service/tyrePriceQuote/sagaHandle';
export default function* rootSaga() {
  yield all([
    //tyrePriceQuote
    yield takeEvery(
      tyrePriceQuoteActions.GET_TYRE_PRICE_QUOTE,
      getTyrePriceQuotes
    ),
    yield takeEvery(
      tyrePriceQuoteActions.INSERT_TYRE_PRICE_QUOTE,
      insertTyrePriceQuote
    ),
    yield takeEvery(
      tyrePriceQuoteActions.UPDATE_TYRE_PRICE_QUOTE,
      updateTyrePriceQuote
    ),
    yield takeEvery(
      tyrePriceQuoteActions.DELETE_TYRE_PRICE_QUOTE,
      deleteTyrePriceQuote
    ),
    yield takeEvery(
      tyrePriceQuoteActions.SET_VIEWED_TYRE_PRICE_QUOTE,
      viewedTyrePriceQuote
    ),
    //get options
    yield takeEvery(
      tyrePriceQuoteActions.GET_TYRE_IN_TYRE_PRICE_QUOTE,
      getTyres
    ),
    yield takeEvery(
      tyrePriceQuoteActions.GET_SUPPLIER_IN_TYRE_PRICE_QUOTE,
      getSuppliers
    ),
    yield takeEvery(
      tyrePriceQuoteActions.GET_APPROVER_IN_TYRE_PRICE_QUOTE,
      getApproverOptions
    ),
    //approve
    yield takeEvery(
      tyrePriceQuoteActions.APPROVE_TYRE_PRICE_QUOTE,
      approveTyrePriceQuote
    ),
  ]);
}
