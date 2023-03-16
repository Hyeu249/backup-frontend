import { call, select, put } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';
import notification from '@iso/components/Notification';

import {
  assignTyreToVehicleApi,
  deleteVehicleTyreAssignmentApi,
  GetTyreAVehicleAssignmentListApi,
  updateVehicleTyreAssignmentApi,
  getAssignmentByIdApi,
  approveVehicleTyreRelationApi,
  //
} from './apis';
import { getVehiclesApi } from '@iso/vex_redux/vehicle/service/vehicle/apis';

import { convertTypeOfTyreAVehicleAssignment } from '../../helpFunction';
import actions from './actions';
import {
  addKeyByIdToObjectArray,
  addLabelFieldFromMatchedArgumentB as addLabel,
  toValueLabelObjectArray,
  getFieldsNeedToUpdate,
  jsonApi,
} from '@iso/vex_redux/helpFunction';
import errorCode from '@iso/vex_redux/error_code.json';
//var
const SUCCESS = 200;

export function* assignTyre({ payload }) {
  const clonePayload = cloneDeep(payload);
  const setOpen = clonePayload.setOpen;
  const viewedTyre = yield select(state => state.tyre.viewedTyre);
  clonePayload.result.tyre_id = viewedTyre.id;
  const assignment = convertTypeOfTyreAVehicleAssignment({
    rawRelation: clonePayload.result,
    listId: true,
  });
  const res = yield call(assignTyreToVehicleApi, assignment);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.GET_VEHICLE_ASSIGNMENT_IN_TYRE,
      tyreId: viewedTyre.id,
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

export function* getTyreVehicleAssignments({ tyreId }) {
  const assignments = [];
  let vehicles = [];
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  //call vehicles api
  const resVehicles = yield call(getVehiclesApi, warehouse.id);
  if (resVehicles.status === SUCCESS) {
    const value = yield call(jsonApi, resVehicles);
    vehicles = toValueLabelObjectArray(value.result);
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }

  //call assignment list api
  const res = yield call(GetTyreAVehicleAssignmentListApi, {
    tyre_id: tyreId,
  });
  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    if (value.result?.length > 0) {
      for (const assignment of value.result) {
        const resAssignment = yield call(getAssignmentByIdApi, assignment.id);
        if (resAssignment.status == SUCCESS) {
          const assignmentValue = yield call(jsonApi, resAssignment);
          assignments.push(assignmentValue.result);
        } else {
          notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
        }
      }
    }
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }

  //load data
  yield put({
    type: actions.LOAD_VEHICLE_ASSIGNMENT_IN_TYRE,
    assignments: addLabel(
      addKeyByIdToObjectArray(assignments),
      vehicles,
      'vehicle_id'
    ),
  });
}

export function* updateVehicleAssignment({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedAssignment, viewedTyre } = yield select(state => state.tyre);
  payload.result.tyre_id = viewedTyre.id;
  const oldAssignment = convertTypeOfTyreAVehicleAssignment({
    rawRelation: viewedAssignment,
    listId: true,
  });
  const assignment = convertTypeOfTyreAVehicleAssignment({
    rawRelation: payload.result,
    listId: true,
  });

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(assignment, oldAssignment);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateVehicleTyreAssignmentApi,
    fieldsNeedToUpdate,
    viewedAssignment.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.GET_VEHICLE_ASSIGNMENT_IN_TYRE,
      tyreId: viewedAssignment.tyre_id,
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

export function* deleteVehicleTyreAssignment({ id }) {
  const viewedTyre = yield select(state => state.tyre.viewedTyre);

  //api
  const res = yield call(deleteVehicleTyreAssignmentApi, id);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({
      type: actions.GET_VEHICLE_ASSIGNMENT_IN_TYRE,
      tyreId: viewedTyre.id,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedVehicleTyreAssignment({ payload }) {
  const id = payload.id;
  const setOpen = payload.setOpen;

  const res = yield call(getAssignmentByIdApi, id);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    //assign approver_id_list
    value.result.approver_id_list = value.result.approver_list.map(
      approver => approver.user_id
    );
    const assignment = convertTypeOfTyreAVehicleAssignment({
      rawRelation: value.result,
      listId: true,
    });
    assignment.id = value.result.id;

    yield put({
      type: actions.UPDATE_VIEWED_TYRE_VEHICLE_ASSIGNMENT,
      assignment: assignment,
    });
    setOpen(true);
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getVehicles() {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const res = yield call(getVehiclesApi, warehouse.id);

  if (res?.status === SUCCESS) {
    const data = yield call(jsonApi, res);
    //add more key value
    const vehicles = toValueLabelObjectArray(data?.result);
    yield put({ type: actions.LOAD_VEHICLE_IN_TYRE, vehicles: vehicles });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* approveVehicleTyreRelation({ id }) {
  const viewedTyre = yield select(state => state.tyre.viewedTyre);
  //api
  const res = yield call(approveVehicleTyreRelationApi, id);
  if (res?.status === SUCCESS) {
    notification('success', 'Duyệt gán lốp thành công');
    yield put({
      type: actions.GET_VEHICLE_ASSIGNMENT_IN_TYRE,
      tyreId: viewedTyre.id,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
