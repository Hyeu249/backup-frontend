import roleOfUserActions from './service/roleOfUser/actions';
const initState = {
  //roleOfUser
  roleOfUsers: [],
  viewedRoleOfUser: {},
  //options
  userOptions: [],
  roleOptions: [],
  domainOptions: [],
};

export default function roleOfUserReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //roleOfUser
    case roleOfUserActions.LOAD_ROLE_OF_USER: {
      return {
        ...state,
        roleOfUsers: action.roleOfUsers,
      };
    }
    case roleOfUserActions.LOAD_USER_IN_ROLE_OF_USER: {
      return {
        ...state,
        userOptions: action.users,
      };
    }
    case roleOfUserActions.LOAD_ROLE_IN_ROLE_OF_USER: {
      return {
        ...state,
        roleOptions: action.roles,
      };
    }
    case roleOfUserActions.LOAD_DOMAIN_IN_ROLE_OF_USER: {
      return {
        ...state,
        domainOptions: action.domains,
      };
    }
    case roleOfUserActions.REMOVE_ROLE_OF_USER: {
      return {
        ...state,
        roleOfUsers: [],
      };
    }
    case roleOfUserActions.UPDATE_VIEWED_ROLE_OF_USER: {
      return { ...state, viewedRoleOfUser: { ...action.viewedRoleOfUser } };
    }
    case roleOfUserActions.REMOVE_VIEWED_ROLE_OF_USER: {
      return { ...state, viewedRoleOfUser: {} };
    }
    default:
      return state;
  }
}
