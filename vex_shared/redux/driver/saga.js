import { all, takeEvery } from 'redux-saga/effects';

import driverActions from './service/driver/actions';
import driverDocumentActions from './service/driverDocument/actions';
import imagesActions from './service/images/actions';

import {
  getDrivers,
  getDepositTypes,
  insertDriver,
  updateDriver,
  deleteDriver,
  viewedDriver,
} from './service/driver/sagaHandle';

import {
  getDriverDocuments,
  getDriverDocumentTypeOptions,
  createDriverDocument,
  deleteDriverDocument,
  setViewedDriverDocument,
} from './service/driverDocument/sagaHandle';

import {
  getDriverDocumentImages,
  uploadDriverDocumentImages,
  getDriverDocumentOptions,
} from './service/images/sagaHandle';

export default function* rootSaga() {
  yield all([
    //driver
    yield takeEvery(driverActions.GET_DRIVER, getDrivers),
    yield takeEvery(
      driverActions.GET_DRIVER_DEPOSIT_TYPE_IN_DRIVER,
      getDepositTypes
    ),
    yield takeEvery(driverActions.INSERT_DRIVER, insertDriver),
    yield takeEvery(driverActions.UPDATE_DRIVER, updateDriver),
    yield takeEvery(driverActions.DELETE_DRIVER, deleteDriver),
    yield takeEvery(driverActions.SET_VIEWED_DRIVER, viewedDriver),
    //driver document
    yield takeEvery(
      driverDocumentActions.GET_DRIVER_DOCUMENT,
      getDriverDocuments
    ),
    yield takeEvery(
      driverDocumentActions.CREATE_DRIVER_DOCUMENT,
      createDriverDocument
    ),
    yield takeEvery(
      driverDocumentActions.DELETE_DRIVER_DOCUMENT,
      deleteDriverDocument
    ),
    yield takeEvery(
      driverDocumentActions.SET_VIEWED_DRIVER_DOCUMENT,
      setViewedDriverDocument
    ),
    yield takeEvery(
      driverDocumentActions.GET_DRIVER_DOCUMENT_TYPE_AT_DRIVER_DOCUMENT,
      getDriverDocumentTypeOptions
    ),
    //images
    yield takeEvery(
      imagesActions.GET_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT,
      getDriverDocumentImages
    ),
    yield takeEvery(
      imagesActions.UPLOAD_IMAGE_FOR_DRIVER_DOCUMENT,
      uploadDriverDocumentImages
    ),
    yield takeEvery(
      imagesActions.GET_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE,
      getDriverDocumentOptions
    ),
  ]);
}
