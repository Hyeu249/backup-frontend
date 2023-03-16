import { all, takeEvery } from 'redux-saga/effects';

import tyreActions from './service/tyre/actions';
import assignmentActions from './service/assignment/actions';
import tyreImagesActions from './service/images/actions';
import {
  getTyres,
  insertTyre,
  updateTyre,
  deleteTyre,
  viewedTyre,
} from './service/tyre/sagaHandle';
import {
  getTyreVehicleAssignments,
  getVehicles,
  assignTyre,
  updateVehicleAssignment,
  deleteVehicleTyreAssignment,
  approveVehicleTyreRelation,
  setViewedVehicleTyreAssignment,
} from './service/assignment/sagaHandle';
import {
  uploadImageForTyre,
  deleteImageForTyre,
  getImagesInTyre,
} from './service/images/sagaHandle';

export default function* rootSaga() {
  yield all([
    //tyre
    yield takeEvery(tyreActions.GET_TYRE, getTyres),
    yield takeEvery(tyreActions.INSERT_TYRE, insertTyre),
    yield takeEvery(tyreActions.UPDATE_TYRE, updateTyre),
    yield takeEvery(tyreActions.DELETE_TYRE, deleteTyre),
    yield takeEvery(tyreActions.SET_VIEWED_TYRE, viewedTyre),
    //assignment
    yield takeEvery(assignmentActions.GET_VEHICLE_IN_TYRE, getVehicles),
    yield takeEvery(
      assignmentActions.GET_VEHICLE_ASSIGNMENT_IN_TYRE,
      getTyreVehicleAssignments
    ),
    yield takeEvery(assignmentActions.ASSIGN_TYRE_TO_VEHICLE, assignTyre),
    yield takeEvery(
      assignmentActions.SET_VIEWED_TYRE_VEHICLE_ASSIGNMENT,
      setViewedVehicleTyreAssignment
    ),
    yield takeEvery(
      assignmentActions.APPROVE_VEHICLE_TYRE_RELATION,
      approveVehicleTyreRelation
    ),
    yield takeEvery(
      assignmentActions.DELETE_VEHICLE_ASSIGNMENT_IN_TYRE,
      deleteVehicleTyreAssignment
    ),
    yield takeEvery(
      assignmentActions.UPDATE_VEHICLE_ASSIGNMENT_IN_TYRE,
      updateVehicleAssignment
    ),
    //images
    yield takeEvery(tyreImagesActions.GET_TYRE_IMAGE_IN_TYRE, getImagesInTyre),
    yield takeEvery(
      tyreImagesActions.UPLOAD_IMAGE_FOR_TYRE,
      uploadImageForTyre
    ),
    yield takeEvery(
      tyreImagesActions.DELETE_IMAGE_FOR_TYRE,
      deleteImageForTyre
    ),
  ]);
}
