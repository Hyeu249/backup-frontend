import { all, takeEvery } from 'redux-saga/effects';
import vehicleActions from './service/vehicle/actions';
import vehicleImagesActions from './service/images/actions';
import trailerActions from './service/trailer/actions';
import vehicleDocumentActions from './service/vehicleDocument/actions';
import {
  getVehicles,
  insertVehicle,
  updateVehicle,
  deleteVehicle,
  viewedVehicle,
  getVehicleTypes,
} from './service/vehicle/sagaHandle';

import {
  uploadImageForVehicle,
  deleteImageForVehicle,
  getImagesInVehicle,
} from './service/images/sagaHandle';

import {
  getVehicleDocuments,
  createVehicleDocument,
  deleteVehicleDocument,
  getVehicleDocumentTypeOptions,
} from './service/vehicleDocument/sagaHandle';

import {
  getTrailers,
  createTrailer,
  updateTrailer,
  deleteTrailer,
  setViewedTrailer,
  attachTrailer,
  detachTrailer,
} from './service/trailer/sagaHandle';
export default function* rootSaga() {
  yield all([
    //vehicle
    yield takeEvery(vehicleActions.GET_VEHICLE, getVehicles),
    yield takeEvery(
      vehicleActions.GET_VEHICLE_TYPE_IN_VEHICLE,
      getVehicleTypes
    ),

    yield takeEvery(vehicleActions.INSERT_VEHICLE, insertVehicle),
    yield takeEvery(vehicleActions.UPDATE_VEHICLE, updateVehicle),
    yield takeEvery(vehicleActions.DELETE_VEHICLE, deleteVehicle),
    yield takeEvery(vehicleActions.SET_VIEWED_VEHICLE, viewedVehicle),
    //images
    yield takeEvery(
      vehicleImagesActions.GET_VEHICLE_IMAGE_IN_VEHICLE,
      getImagesInVehicle
    ),
    yield takeEvery(
      vehicleImagesActions.UPLOAD_IMAGE_FOR_VEHICLE,
      uploadImageForVehicle
    ),
    yield takeEvery(
      vehicleImagesActions.DELETE_IMAGE_FOR_VEHICLE,
      deleteImageForVehicle
    ),
    //attached trailer
    yield takeEvery(trailerActions.GET_TRAILER, getTrailers),
    yield takeEvery(trailerActions.INSERT_TRAILER, createTrailer),
    yield takeEvery(trailerActions.DELETE_TRAILER, deleteTrailer),
    yield takeEvery(trailerActions.UPDATE_TRAILER, updateTrailer),
    yield takeEvery(trailerActions.SET_VIEWED_TRAILER, setViewedTrailer),
    yield takeEvery(trailerActions.ATTACH_TRAILER, attachTrailer),
    yield takeEvery(trailerActions.DETACH_TRAILER, detachTrailer),
    //vehicle documents
    yield takeEvery(
      vehicleDocumentActions.GET_VEHICLE_DOCUMENT_TYPE_AT_VEHICLE_DOCUMENT,
      getVehicleDocumentTypeOptions
    ),
    yield takeEvery(
      vehicleDocumentActions.GET_VEHICLE_DOCUMENT,
      getVehicleDocuments
    ),
    yield takeEvery(
      vehicleDocumentActions.CREATE_VEHICLE_DOCUMENT,
      createVehicleDocument
    ),
    yield takeEvery(
      vehicleDocumentActions.DELETE_VEHICLE_DOCUMENT,
      deleteVehicleDocument
    ),
  ]);
}
