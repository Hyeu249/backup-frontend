import { all, takeEvery, put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getEquipmentGroupsApi,
  insertEquipmentGroupApi,
  updateEquipmentGroupApi,
  deleteEquipmentGroupApi,
  getEquipmentGroupByIdApi,
  jsonApi,
  blobApi,
} from './apis';

import { convertTypeOfEquipmentGroup } from './helpFunction';

import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
} from '@iso/vex_redux/helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getEquipmentGroups() {
  //call api
  const res = yield call(getEquipmentGroupsApi);

  //react if have response
  if (res?.status === SUCCESS) {
    //parse json
    const value = yield call(jsonApi, res);
    //adding key field to every object value
    const equipmentGroups = addKeyByIdToObjectArray(value?.result);
    //load equipmentGroups to redux
    yield put({ type: actions.LOAD_EQUIPMENT_GROUP, equipmentGroups });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertEquipmentGroup(a) {
  //convert types to types of EquipmentGroup
  const equipmentGroup = convertTypeOfEquipmentGroup(a.payload.result);
  //get setOpen
  const setOpen = a.payload.setOpen;
  //using api to call to backend
  const res = yield call(insertEquipmentGroupApi, equipmentGroup);

  //react if have response
  if (res?.status === SUCCESS) {
    //send success message
    notification('success', 'Tạo dữ liệu thành công');
    //close create modal
    setOpen(false);
    yield put({ type: actions.GET_EQUIPMENT_GROUP });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateEquipmentGroup(a) {
  const setOpen = a.payload.setOpen;

  //select equipmentGroup from redux
  let { viewedEquipmentGroup } = yield select(state => state.equipmentGroup);
  //convert types of the old one to types of EquipmentGroup
  const oldEquipmentGroup = convertTypeOfEquipmentGroup(viewedEquipmentGroup);
  //convert types of the new one to types of EquipmentGroup
  const equipmentGroup = convertTypeOfEquipmentGroup(a.payload.result);

  //compare old and new one to get fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(
    equipmentGroup,
    oldEquipmentGroup
  );

  //if no field need to update, return
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //if have field need to update, call api to update
  const res = yield call(
    updateEquipmentGroupApi,
    fieldsNeedToUpdate,
    viewedEquipmentGroup.id
  );

  //react after have response
  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    //close update modal
    setOpen(false);
    //set viewedEquipmentGroup at redux to empty
    yield put({ type: actions.REMOVE_VIEWED_EQUIPMENT_GROUP });
    //get the newest equipmentGroups at redux after update one
    yield put({ type: actions.GET_EQUIPMENT_GROUP });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteEquipmentGroup(a) {
  //call api
  const res = yield call(deleteEquipmentGroupApi, a.equipmentGroupID);

  //react if have response
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    //get the newest equipmentGroups after delete one
    yield put({ type: actions.GET_EQUIPMENT_GROUP });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedEquipmentGroup({ payload }) {
  //declare variables
  const equipmentGroupID = payload.equipmentGroupID;
  const setOpen = payload.setOpen;

  //call api
  const res = yield call(getEquipmentGroupByIdApi, equipmentGroupID);

  //react if have response
  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const equipmentGroup = value.result;

    // convert equipmentGroup type
    const convertedEquipmentGroup = convertTypeOfEquipmentGroup(equipmentGroup);
    convertedEquipmentGroup.id = equipmentGroup.id;

    //open edit modal
    setOpen(true);
    //set redux state
    yield put({
      type: actions.UPDATE_VIEWED_EQUIPMENT_GROUP,
      viewedEquipmentGroup: convertedEquipmentGroup,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.INSERT_EQUIPMENT_GROUP, insertEquipmentGroup),
    yield takeEvery(actions.UPDATE_EQUIPMENT_GROUP, updateEquipmentGroup),
    yield takeEvery(actions.GET_EQUIPMENT_GROUP, getEquipmentGroups),
    yield takeEvery(actions.DELETE_EQUIPMENT_GROUP, deleteEquipmentGroup),
    yield takeEvery(
      actions.SET_VIEWED_EQUIPMENT_GROUP,
      setViewedEquipmentGroup
    ),
  ]);
}
