import { all, takeEvery } from 'redux-saga/effects';

import roleActions from './service/role/actions';
import {
  getRoles,
  insertRole,
  updateRole,
  deleteRole,
  viewedRole,
  //options
  getObjectRoleOptions,
} from './service/role/sagaHandle';
export default function* rootSaga() {
  yield all([
    //role
    yield takeEvery(roleActions.GET_ROLE, getRoles),
    yield takeEvery(roleActions.INSERT_ROLE, insertRole),
    yield takeEvery(roleActions.UPDATE_ROLE, updateRole),
    yield takeEvery(roleActions.DELETE_ROLE, deleteRole),
    yield takeEvery(roleActions.SET_VIEWED_ROLE, viewedRole),
    //options
    yield takeEvery(
      roleActions.GET_A_LIST_OF_OBJECTS_WITH_ACTIONS,
      getObjectRoleOptions
    ),
  ]);
}
