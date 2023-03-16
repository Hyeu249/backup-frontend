import { all, takeEvery } from 'redux-saga/effects';

import fuelPriceQuoteActions from './service/fuelPriceQuote/actions';
import {
  getFuelPriceQuotes,
  insertFuelPriceQuote,
  updateFuelPriceQuote,
  deleteFuelPriceQuote,
  viewedFuelPriceQuote,
  getFuels,
  getSuppliers,
  approveFuelPriceQuote,
  getApproverOptions,
} from './service/fuelPriceQuote/sagaHandle';
export default function* rootSaga() {
  yield all([
    //fuelPriceQuote
    yield takeEvery(
      fuelPriceQuoteActions.GET_FUEL_PRICE_QUOTE,
      getFuelPriceQuotes
    ),
    yield takeEvery(
      fuelPriceQuoteActions.INSERT_FUEL_PRICE_QUOTE,
      insertFuelPriceQuote
    ),
    yield takeEvery(
      fuelPriceQuoteActions.UPDATE_FUEL_PRICE_QUOTE,
      updateFuelPriceQuote
    ),
    yield takeEvery(
      fuelPriceQuoteActions.DELETE_FUEL_PRICE_QUOTE,
      deleteFuelPriceQuote
    ),
    yield takeEvery(
      fuelPriceQuoteActions.SET_VIEWED_FUEL_PRICE_QUOTE,
      viewedFuelPriceQuote
    ),
    //get options
    yield takeEvery(
      fuelPriceQuoteActions.GET_FUEL_IN_FUEL_PRICE_QUOTE,
      getFuels
    ),
    yield takeEvery(
      fuelPriceQuoteActions.GET_SUPPLIER_IN_FUEL_PRICE_QUOTE,
      getSuppliers
    ),
    yield takeEvery(
      fuelPriceQuoteActions.GET_APPROVER_IN_FUEL_PRICE_QUOTE,
      getApproverOptions
    ),
    //approve
    yield takeEvery(
      fuelPriceQuoteActions.APPROVE_FUEL_PRICE_QUOTE,
      approveFuelPriceQuote
    ),
  ]);
}
