import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getRolesApi,
  insertRoleApi,
  updateRoleApi,
  deleteRoleApi,
  getRoleByIdApi,
  //
  getAListOfObjectsWithActionsApi,
  getPoliciesAssociateWithAsingleRoleApi,
} from './apis';
import { convertTypeOfRole } from '@iso/vex_redux/role/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  toKeyIdValueLabelOfStringArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';
import errorCode from '@iso/vex_redux/error_code.json';
//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getRoles({ warehouseID }) {
  const res = yield call(getRolesApi, warehouseID);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const roles = toKeyIdValueLabelOfStringArray(value?.result);
    yield put({ type: actions.LOAD_ROLE, roles });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getObjectRoleOptions() {
  const res = yield call(getAListOfObjectsWithActionsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const objectActions = value?.result;
    yield put({
      type: actions.LOAD_A_LIST_OF_OBJECTS_WITH_ACTIONS,
      objectActions,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* insertRole({ payload }) {
  const role = convertTypeOfRole(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertRoleApi, role);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_ROLE });
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

export function* updateRole({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedRole } = yield select(state => state.role);
  const oldRole = convertTypeOfRole(viewedRole);
  const role = convertTypeOfRole(payload.result);

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(role, oldRole);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(updateRoleApi, fieldsNeedToUpdate, viewedRole.id);

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_ROLE,
      payload: { roleID: viewedRole.id },
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

export function* deleteRole({ roleID }) {
  //api
  const res = yield call(deleteRoleApi, roleID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_ROLE });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedRole({ payload }) {
  const roleID = payload.roleID;
  const res = yield call(getPoliciesAssociateWithAsingleRoleApi, roleID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    console.log('res:', value.result);
    return;
    const role = convertTypeOfRole(value.result);
    role.id = payload.roleID;

    yield put({
      type: actions.UPDATE_VIEWED_ROLE,
      viewedRole: role,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
