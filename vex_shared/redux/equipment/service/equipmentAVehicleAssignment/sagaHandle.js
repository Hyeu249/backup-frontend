import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getEquipmentAVehicleAssignmentList,
  insertEquipmentAVehicleAssignmentApi,
  deleteEquipmentAVehicleAssignmentApi,
  approveEquipmentAVehicleAssignmentApi,
  //
} from './apis';

import {
  getVehiclesApi,
  getVehicleByIdApi,
} from '@iso/vex_redux/vehicle/service/vehicle/apis';
import { getApproversByObjectApi } from '@iso/vex_redux/globalApi';

import { convertTypeOfEquipmentAVehicleAssignment } from '@iso/vex_redux/equipment/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  callSetErrFieldsWhenHaveErr,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';
import errorCode from '@iso/vex_redux/error_code.json';
//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getEquipmentAVehicleAssignments({ equipmentId }) {
  const res = yield call(getEquipmentAVehicleAssignmentList, {
    equipment_id: equipmentId,
  });

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const equipmentAVehicleAssignments = addKeyByIdToObjectArray(value?.result);
    for (const [i, raw] of equipmentAVehicleAssignments.entries()) {
      const data = cloneDeep(raw);
      const vehicleRes = yield call(getVehicleByIdApi, data.vehicle_id);
      if (vehicleRes.status === SUCCESS) {
        const vehicleValue = yield call(jsonApi, vehicleRes);
        equipmentAVehicleAssignments[i].value =
          equipmentAVehicleAssignments[i].id;
        equipmentAVehicleAssignments[i].label = vehicleValue.result.name;
      } else {
        notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
      }
    }

    yield put({
      type: actions.LOAD_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      equipmentAVehicleAssignments,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getVehicleOptions() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getVehiclesApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const vehicles = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_VEIHCLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      vehicles,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* createEquipmentAVehicleAssignment({ payload }) {
  const equipmentAVehicleAssignment = convertTypeOfEquipmentAVehicleAssignment({
    rawValue: payload.result,
  });
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;

  //api call
  const res = yield call(
    insertEquipmentAVehicleAssignmentApi,
    equipmentAVehicleAssignment
  );

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.GET_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      equipmentId: equipmentAVehicleAssignment.equipment_id,
    });
  } else {
    const { locale } = yield select(state => state.LanguageSwitcher.language);
    const value = yield call(jsonApi, res);
    const message = JSON.parse(value.message);
    const localErrorCodes = errorCode.errors;
    const isHaveField = localErrorCodes[message.error_code].field !== undefined;

    if (isHaveField) {
      const field = localErrorCodes[message.error_code].field;
      let text = message[locale];
      if (message[locale].length > 40) {
        text = message[locale].substring(0, 40) + '...';
      }

      setErrFields({
        [field]: text,
      });
    }
    notification('error', message[locale]);
  }
}

export function* deleteEquipmentAVehicleAssignment({ id, equipmentId }) {
  //api
  const res = yield call(deleteEquipmentAVehicleAssignmentApi, id);
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({
      type: actions.GET_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      equipmentId: equipmentId,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* approveEquipmentAVehicleAssignment(payload) {
  //api
  const res = yield call(approveEquipmentAVehicleAssignmentApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({
      type: actions.GET_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      equipmentId: payload.equipmentId,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getApproverOptionsForVehicleAssignment() {
  const res = yield call(
    getApproversByObjectApi,
    'equipment-vehicle-assignment'
  );

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const approvers = toValueLabelObjectArray(
      value?.result?.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );
    yield put({
      type: actions.LOAD_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT,
      approvers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
