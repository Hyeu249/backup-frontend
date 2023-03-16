import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getRoleOfUsersApi,
  insertRoleOfUserApi,
  updateRoleOfUserApi,
  deleteRoleOfUserApi,
  getRoleOfUserByIdApi,
  //
  getAListOfDomainApi,
  getAListOfAllRolesApi,
  getRoleOfUserInAllDomainsApi,
} from './apis';
import { convertTypeOfRoleOfUser } from '@iso/vex_redux/roleOfUser/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  toKeyIdValueLabelOfStringArray,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';
//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getRoleOfUsers() {
  const res = yield call(getRoleOfUsersApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const roleOfUsers = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_ROLE_OF_USER, roleOfUsers });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getUserOptions() {
  const res = yield call(getRoleOfUsersApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const users = toValueLabelObjectArray(
      value?.result.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );

    yield put({ type: actions.LOAD_USER_IN_ROLE_OF_USER, users });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getRoleOptions() {
  const res = yield call(getAListOfAllRolesApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const roles = toKeyIdValueLabelOfStringArray(value?.result);

    yield put({ type: actions.LOAD_ROLE_IN_ROLE_OF_USER, roles });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* getDomainOptions() {
  const res = yield call(getAListOfDomainApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const domains = toValueLabelObjectArray(value?.result);

    yield put({ type: actions.LOAD_DOMAIN_IN_ROLE_OF_USER, domains });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
export function* insertRoleOfUser({ payload }) {
  const roleOfUser = convertTypeOfRoleOfUser(payload.result);
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertRoleOfUserApi, roleOfUser, payload.result.role);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_ROLE_OF_USER });
  } else {
    const { locale } = yield select(state => state.LanguageSwitcher.language);
    const value = yield call(jsonApi, res);
    const message = JSON.parse(value.message);

    notification('error', message[locale]);
  }
}

export function* updateRoleOfUser({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedRoleOfUser } = yield select(state => state.roleOfUser);
  const oldRoleOfUser = convertTypeOfRoleOfUser(viewedRoleOfUser);
  const roleOfUser = convertTypeOfRoleOfUser(payload.result);

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(roleOfUser, oldRoleOfUser);

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateRoleOfUserApi,
    fieldsNeedToUpdate,
    viewedRoleOfUser.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_ROLE_OF_USER,
      payload: { roleOfUserID: viewedRoleOfUser.id },
    });
  } else {
    const { locale } = yield select(state => state.LanguageSwitcher.language);
    const value = yield call(jsonApi, res);
    const message = JSON.parse(value.message);

    notification('error', message[locale]);
  }
}

export function* deleteRoleOfUser(a) {
  //api
  const res = yield call(deleteRoleOfUserApi, a.roleOfUserID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_ROLE_OF_USER });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedRoleOfUser({ payload }) {
  const roleOfUserID = payload.roleOfUserID;
  const res = yield call(getRoleOfUserInAllDomainsApi, roleOfUserID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    console.log('value', value.result);
    const roleOfUser = convertTypeOfRoleOfUser(value.result);
    roleOfUser.id = payload.roleOfUserID;

    yield put({
      type: actions.UPDATE_VIEWED_ROLE_OF_USER,
      viewedRoleOfUser: roleOfUser,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
