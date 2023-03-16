import { all, takeEvery } from 'redux-saga/effects';

import equipmentActions from './service/equipment/actions';
import assignDriverAtions from './service/equipmentADriverAssignment/actions';
import assignVehicleAtions from './service/equipmentAVehicleAssignment/actions';

import {
  //equipment
  getEquipments,
  insertEquipment,
  updateEquipment,
  deleteEquipment,
  viewedEquipment,
  getMaintenanceTypes,
  getEquipmentGroups,
} from './service/equipment/sagaHandle';

import {
  //assign driver
  getEquipmentADriverAssignments,
  createEquipmentADriverAssignment,
  deleteEquipmentADriverAssignment,
  getDriverOptions,
  approveEquipmentADriverAssignment,
  getApproverOptionsForDriverAssignment,
} from './service/equipmentADriverAssignment/sagaHandle';

import {
  //assign vehicle
  getEquipmentAVehicleAssignments,
  createEquipmentAVehicleAssignment,
  deleteEquipmentAVehicleAssignment,
  getVehicleOptions,
  approveEquipmentAVehicleAssignment,
  getApproverOptionsForVehicleAssignment,
} from './service/equipmentAVehicleAssignment/sagaHandle';

export default function* rootSaga() {
  yield all([
    //equipment
    yield takeEvery(equipmentActions.GET_EQUIPMENT, getEquipments),
    yield takeEvery(
      equipmentActions.GET_MAINTENANCE_TYPE_IN_EQUIPMENT,
      getMaintenanceTypes
    ),
    yield takeEvery(
      equipmentActions.GET_EQUIPMENT_GROUP_IN_EQUIPMENT,
      getEquipmentGroups
    ),

    yield takeEvery(equipmentActions.INSERT_EQUIPMENT, insertEquipment),
    yield takeEvery(equipmentActions.UPDATE_EQUIPMENT, updateEquipment),
    yield takeEvery(equipmentActions.DELETE_EQUIPMENT, deleteEquipment),
    yield takeEvery(equipmentActions.SET_VIEWED_EQUIPMENT, viewedEquipment),
    //driver assignments
    yield takeEvery(
      assignDriverAtions.GET_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      getEquipmentADriverAssignments
    ),
    yield takeEvery(
      assignDriverAtions.CREATE_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      createEquipmentADriverAssignment
    ),
    yield takeEvery(
      assignDriverAtions.DELETE_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      deleteEquipmentADriverAssignment
    ),

    yield takeEvery(
      assignDriverAtions.GET_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      getDriverOptions
    ),
    yield takeEvery(
      assignDriverAtions.APPROVE_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      approveEquipmentADriverAssignment
    ),
    yield takeEvery(
      assignDriverAtions.GET_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      getApproverOptionsForDriverAssignment
    ),
    //vehicle assignments
    yield takeEvery(
      assignVehicleAtions.GET_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      getEquipmentAVehicleAssignments
    ),
    yield takeEvery(
      assignVehicleAtions.CREATE_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      createEquipmentAVehicleAssignment
    ),
    yield takeEvery(
      assignVehicleAtions.DELETE_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      deleteEquipmentAVehicleAssignment
    ),

    yield takeEvery(
      assignVehicleAtions.GET_VEHICLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      getVehicleOptions
    ),
    yield takeEvery(
      assignVehicleAtions.APPROVE_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      approveEquipmentAVehicleAssignment
    ),
    yield takeEvery(
      assignVehicleAtions.GET_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      getApproverOptionsForVehicleAssignment
    ),
  ]);
}
