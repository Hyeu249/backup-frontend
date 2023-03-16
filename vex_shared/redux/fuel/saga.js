import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getFuelsApi,
  insertFuelApi,
  updateFuelApi,
  deleteFuelApi,
  getFuelByIdApi,
} from './apis';

import { convertTypeOfFuel } from './helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  jsonApi,
  blobApi,
} from '@iso/vex_redux/helpFunction';

//var
export const SUCCESS = 200;
export const BAD_REQUEST = 400;

export function* getFuels() {
  //call api
  const res = yield call(getFuelsApi);

  //react if have response
  if (res?.status === SUCCESS) {
    //parse json
    const value = yield call(jsonApi, res);
    //adding key field to every object value
    const fuels = addKeyByIdToObjectArray(value?.result);
    //load fuels to redux
    yield put({ type: actions.LOAD_FUEL, fuels });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertFuel(a) {
  //convert types to types of Fuel
  const fuel = convertTypeOfFuel(a.payload.result);
  //get setOpen
  const setOpen = a.payload.setOpen;
  //using api to call to backend
  const res = yield call(insertFuelApi, fuel);

  //react if have response
  if (res?.status === SUCCESS) {
    //send success message
    notification('success', 'Tạo dữ liệu thành công');
    //close create modal
    setOpen(false);
    yield put({ type: actions.GET_FUEL });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* updateFuel(a) {
  const setOpen = a.payload.setOpen;

  //select fuel from redux
  let { viewedFuel } = yield select(state => state.fuel);
  //convert types of the old one to types of Fuel
  const oldFuel = convertTypeOfFuel(viewedFuel);
  //convert types of the new one to types of Fuel
  const fuel = convertTypeOfFuel(a.payload.result);

  //compare old and new one to get fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(fuel, oldFuel);

  //if no field need to update, return
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('error', 'Không có trường cần update!');
  }

  //if have field need to update, call api to update
  const res = yield call(updateFuelApi, fieldsNeedToUpdate, viewedFuel.id);

  //react after have response
  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    //close update modal
    setOpen(false);
    //set viewedFuel at redux to empty
    yield put({ type: actions.REMOVE_VIEWED_FUEL });
    //get the newest fuels at redux after update one
    yield put({ type: actions.GET_FUEL });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* deleteFuel(a) {
  //call api
  const res = yield call(deleteFuelApi, a.fuelID);

  //react if have response
  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    //get the newest fuels after delete one
    yield put({ type: actions.GET_FUEL });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* setViewedFuel({ payload }) {
  //declare variables
  const fuelID = payload.fuelID;
  const setOpen = payload.setOpen;

  //call api
  const res = yield call(getFuelByIdApi, fuelID);

  //react if have response
  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const fuel = value.result;

    // convert fuel type
    const convertedFuel = convertTypeOfFuel(fuel);
    convertedFuel.id = fuel.id;

    //open edit modal
    setOpen(true);
    //set redux state
    yield put({
      type: actions.UPDATE_VIEWED_FUEL,
      viewedFuel: convertedFuel,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.INSERT_FUEL, insertFuel),
    yield takeEvery(actions.UPDATE_FUEL, updateFuel),
    yield takeEvery(actions.GET_FUEL, getFuels),
    yield takeEvery(actions.DELETE_FUEL, deleteFuel),
    yield takeEvery(actions.SET_VIEWED_FUEL, setViewedFuel),
  ]);
}
