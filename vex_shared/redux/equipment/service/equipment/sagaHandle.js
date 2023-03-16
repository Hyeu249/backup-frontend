import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getEquipmentsApi,
  insertEquipmentApi,
  updateEquipmentApi,
  deleteEquipmentApi,
  getEquipmentByIdApi,
  //
} from './apis';
import { getMaintenanceTypesApi } from '@iso/vex_redux/maintenanceType/apis';
import { getEquipmentGroupsApi } from '@iso/vex_redux/equipmentGroup/apis';
import { convertTypeOfEquipment } from '@iso/vex_redux/equipment/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  callSetErrFieldsWhenHaveErr,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getEquipments() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getEquipmentsApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const equipments = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_EQUIPMENT, equipments });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getMaintenanceTypes() {
  const res = yield call(getMaintenanceTypesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const maintenanceTypes = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_MAINTENANCE_TYPE_IN_EQUIPMENT,
      maintenanceTypes,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getEquipmentGroups() {
  const res = yield call(getEquipmentGroupsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const equipmentGroups = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_EQUIPMENT_GROUP_IN_EQUIPMENT,
      equipmentGroups,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* insertEquipment({ payload }) {
  const equipment = convertTypeOfEquipment(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //api call
  const res = yield call(insertEquipmentApi, equipment, warehouse.id);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_EQUIPMENT });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateEquipment({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedEquipment } = yield select(state => state.equipment);
  const oldEquipment = convertTypeOfEquipment(viewedEquipment);
  const equipment = convertTypeOfEquipment(payload.result);
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(equipment, oldEquipment);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateEquipmentApi,
    fieldsNeedToUpdate,
    viewedEquipment.id,
    warehouse.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_EQUIPMENT,
      payload: { equipmentID: viewedEquipment.id },
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteEquipment(a) {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //api
  const res = yield call(deleteEquipmentApi, a.equipmentID, warehouse.id);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_EQUIPMENT });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedEquipment({ payload }) {
  const equipmentID = payload.equipmentID;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getEquipmentByIdApi, equipmentID, warehouse.id);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const equipment = convertTypeOfEquipment(value.result);
    equipment.id = payload.equipmentID;

    yield put({
      type: actions.UPDATE_VIEWED_EQUIPMENT,
      viewedEquipment: equipment,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
