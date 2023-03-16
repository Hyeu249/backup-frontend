import { all, takeEvery } from 'redux-saga/effects';

import roleOfUserActions from './service/roleOfUser/actions';
import {
  getRoleOfUsers,
  insertRoleOfUser,
  updateRoleOfUser,
  deleteRoleOfUser,
  viewedRoleOfUser,
  //options
  getUserOptions,
  getRoleOptions,
  getDomainOptions,
} from './service/roleOfUser/sagaHandle';
export default function* rootSaga() {
  yield all([
    //roleOfUser
    yield takeEvery(roleOfUserActions.GET_ROLE_OF_USER, getRoleOfUsers),
    yield takeEvery(roleOfUserActions.INSERT_ROLE_OF_USER, insertRoleOfUser),
    yield takeEvery(roleOfUserActions.UPDATE_ROLE_OF_USER, updateRoleOfUser),
    yield takeEvery(roleOfUserActions.DELETE_ROLE_OF_USER, deleteRoleOfUser),
    yield takeEvery(
      roleOfUserActions.SET_VIEWED_ROLE_OF_USER,
      viewedRoleOfUser
    ),
    //options
    yield takeEvery(roleOfUserActions.GET_USER_IN_ROLE_OF_USER, getUserOptions),
    yield takeEvery(roleOfUserActions.GET_ROLE_IN_ROLE_OF_USER, getRoleOptions),
    yield takeEvery(
      roleOfUserActions.GET_DOMAIN_IN_ROLE_OF_USER,
      getDomainOptions
    ),
  ]);
}
