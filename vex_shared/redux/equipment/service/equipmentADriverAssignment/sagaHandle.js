import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getEquipmentAVehicleAssignmentList,
  insertEquipmentADriverAssignmentApi,
  deleteEquipmentADriverAssignmentApi,
  approveEquipmentADriverAssignmentApi,
  //
} from './apis';
import {
  getDriversApi,
  getDriverByIdApi,
} from '@iso/vex_redux/driver/service/driver/apis';
import { getApproversByObjectApi } from '@iso/vex_redux/globalApi';

import { convertTypeOfEquipmentADriverAssignment } from '@iso/vex_redux/equipment/helpFunction';
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

export function* getEquipmentADriverAssignments({ equipmentId }) {
  const res = yield call(getEquipmentAVehicleAssignmentList, {
    equipment_id: equipmentId,
  });

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const equipmentADriverAssignments = addKeyByIdToObjectArray(value?.result);
    for (const [i, raw] of equipmentADriverAssignments.entries()) {
      const data = cloneDeep(raw);
      const driverRes = yield call(getDriverByIdApi, data.vehicle_driver_id);
      if (driverRes.status === SUCCESS) {
        const driverValue = yield call(jsonApi, driverRes);
        equipmentADriverAssignments[i].value =
          equipmentADriverAssignments[i].id;
        equipmentADriverAssignments[i].label =
          driverValue.result.last_name + ' ' + driverValue.result.first_name;
      } else {
        notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
      }
    }

    yield put({
      type: actions.LOAD_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      equipmentADriverAssignments,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getDriverOptions() {
  const res = yield call(getDriversApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const drivers = toValueLabelObjectArray(value?.result);
    yield put({
      type: actions.LOAD_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      drivers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* createEquipmentADriverAssignment({ payload }) {
  const equipmentADriverAssignment = convertTypeOfEquipmentADriverAssignment({
    rawValue: payload.result,
  });
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(
    insertEquipmentADriverAssignmentApi,
    equipmentADriverAssignment
  );

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.GET_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      equipmentId: equipmentADriverAssignment.equipment_id,
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

export function* deleteEquipmentADriverAssignment({ id, equipmentId }) {
  //api
  const res = yield call(deleteEquipmentADriverAssignmentApi, id);
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({
      type: actions.GET_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      equipmentId: equipmentId,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* approveEquipmentADriverAssignment(payload) {
  //api
  const res = yield call(approveEquipmentADriverAssignmentApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({
      type: actions.GET_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      equipmentId: payload.equipmentId,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getApproverOptionsForDriverAssignment() {
  const res = yield call(
    getApproversByObjectApi,
    'equipment-vehicle-driver-assignment'
  );

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const approvers = toValueLabelObjectArray(
      value?.result.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );
    yield put({
      type: actions.LOAD_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT,
      approvers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
