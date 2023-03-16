const actions = {
  //roleOfUser
  GET_ROLE_OF_USER: 'GET_ROLE_OF_USER',
  INSERT_ROLE_OF_USER: 'INSERT_ROLE_OF_USER',
  UPDATE_ROLE_OF_USER: 'UPDATE_ROLE_OF_USER',
  DELETE_ROLE_OF_USER: 'DELETE_ROLE_OF_USER',

  LOAD_ROLE_OF_USER: 'LOAD_ROLE_OF_USER',
  REMOVE_ROLE_OF_USER: 'REMOVE_ROLE_OF_USER',

  SET_VIEWED_ROLE_OF_USER: 'SET_VIEWED_ROLE_OF_USER',
  UPDATE_VIEWED_ROLE_OF_USER: 'UPDATE_VIEWED_ROLE_OF_USER',
  REMOVE_VIEWED_ROLE_OF_USER: 'REMOVE_VIEWED_ROLE_OF_USER',
  //options
  GET_USER_IN_ROLE_OF_USER: 'GET_USER_IN_ROLE_OF_USER',
  LOAD_USER_IN_ROLE_OF_USER: 'LOAD_USER_IN_ROLE_OF_USER',
  REMOVE_USER_IN_ROLE_OF_USER: 'REMOVE_USER_IN_ROLE_OF_USER',

  GET_ROLE_IN_ROLE_OF_USER: 'GET_ROLE_IN_ROLE_OF_USER',
  LOAD_ROLE_IN_ROLE_OF_USER: 'LOAD_ROLE_IN_ROLE_OF_USER',
  REMOVE_ROLE_IN_ROLE_OF_USER: 'REMOVE_ROLE_IN_ROLE_OF_USER',

  GET_DOMAIN_IN_ROLE_OF_USER: 'GET_DOMAIN_IN_ROLE_OF_USER',
  LOAD_DOMAIN_IN_ROLE_OF_USER: 'LOAD_DOMAIN_IN_ROLE_OF_USER',
  REMOVE_DOMAIN_IN_ROLE_OF_USER: 'REMOVE_DOMAIN_IN_ROLE_OF_USER',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_ROLE_OF_USER });
      dispatch({ type: actions.GET_USER_IN_ROLE_OF_USER });
      dispatch({ type: actions.GET_ROLE_IN_ROLE_OF_USER });
      dispatch({ type: actions.GET_DOMAIN_IN_ROLE_OF_USER });
    };
  },
  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_ROLE_OF_USER });
      dispatch({ type: actions.REMOVE_USER_IN_ROLE_OF_USER });
      dispatch({ type: actions.REMOVE_ROLE_IN_ROLE_OF_USER });
      dispatch({ type: actions.REMOVE_DOMAIN_IN_ROLE_OF_USER });
    };
  },
  initEditData: payload => {
    return dispatch => {
      dispatch({ type: actions.SET_VIEWED_ROLE_OF_USER, payload });
    };
  },
  removeEditData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_VIEWED_ROLE_OF_USER });
    };
  },

  createRoleOfUser: payload => ({ type: actions.INSERT_ROLE_OF_USER, payload }),
  updateRoleOfUser: payload => ({ type: actions.UPDATE_ROLE_OF_USER, payload }),
  deleteRoleOfUser: roleOfUserID => ({
    type: actions.DELETE_ROLE_OF_USER,
    roleOfUserID,
  }),

  setViewedRoleOfUser: payload => ({
    type: actions.SET_VIEWED_ROLE_OF_USER,
    payload,
  }),
  removeViewedRoleOfUser: () => ({ type: actions.REMOVE_VIEWED_ROLE_OF_USER }),
};
export default actions;
