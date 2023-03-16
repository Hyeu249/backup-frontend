import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';
import warehouseActions from '@iso/vex_redux/assetWarehouse/actions';

const history = createBrowserHistory();
const fakeApiCall = false; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    const { token } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    } else {
      if (fakeApiCall) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: 'secret token',
          profile: 'Profile',
        });
      } else {
        yield put({ type: actions.LOGIN_ERROR });
      }
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem('id_token', payload.token);
    yield put({ type: actions.SUCCESS_LOGIN_STATUS });
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    }
  });
}

export function* successLoginStatus() {
  yield takeEvery(actions.SUCCESS_LOGIN_STATUS, function* () {
    yield put({ type: warehouseActions.GET_WAREHOUSE });
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
    fork(successLoginStatus),
  ]);
}
