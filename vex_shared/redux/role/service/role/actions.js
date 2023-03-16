const actions = {
  //role
  GET_ROLE: 'GET_ROLE',
  INSERT_ROLE: 'INSERT_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  DELETE_ROLE: 'DELETE_ROLE',

  LOAD_ROLE: 'LOAD_ROLE',
  REMOVE_ROLE: 'REMOVE_ROLE',

  SET_VIEWED_ROLE: 'SET_VIEWED_ROLE',
  UPDATE_VIEWED_ROLE: 'UPDATE_VIEWED_ROLE',
  REMOVE_VIEWED_ROLE: 'REMOVE_VIEWED_ROLE',

  //options
  GET_A_LIST_OF_OBJECTS_WITH_ACTIONS: 'GET_A_LIST_OF_OBJECTS_WITH_ACTIONS',
  LOAD_A_LIST_OF_OBJECTS_WITH_ACTIONS: 'LOAD_A_LIST_OF_OBJECTS_WITH_ACTIONS',
  REMOVE_A_LIST_OF_OBJECTS_WITH_ACTIONS:
    'REMOVE_A_LIST_OF_OBJECTS_WITH_ACTIONS',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_ROLE });
      dispatch({ type: actions.GET_A_LIST_OF_OBJECTS_WITH_ACTIONS });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_ROLE });
      dispatch({ type: actions.REMOVE_A_LIST_OF_OBJECTS_WITH_ACTIONS });
    };
  },
  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_ROLE, payload });
      dispatch({ type: actions.GET_A_LIST_OF_OBJECTS_WITH_ACTIONS });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_ROLE });
      dispatch({ type: actions.REMOVE_A_LIST_OF_OBJECTS_WITH_ACTIONS });
    };
  },

  createRole: payload => ({ type: actions.INSERT_ROLE, payload }),
  updateRole: payload => ({ type: actions.UPDATE_ROLE, payload }),
  deleteRole: roleID => ({
    type: actions.DELETE_ROLE,
    roleID,
  }),

  setViewedRole: payload => ({
    type: actions.SET_VIEWED_ROLE,
    payload,
  }),
  removeViewedRole: () => ({ type: actions.REMOVE_VIEWED_ROLE }),
};
export default actions;
