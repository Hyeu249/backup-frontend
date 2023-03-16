import roleActions from './service/role/actions';
const initState = {
  //role
  roles: [],
  viewedRole: {},
  //options
  objectActionOptions: {},
};

export default function roleReducer(state = initState, { type, ...action }) {
  switch (type) {
    //role
    case roleActions.LOAD_ROLE: {
      return {
        ...state,
        roles: action.roles,
      };
    }
    case roleActions.REMOVE_ROLE: {
      return {
        ...state,
        roles: [],
      };
    }
    case roleActions.LOAD_A_LIST_OF_OBJECTS_WITH_ACTIONS: {
      return {
        ...state,
        objectActionOptions: action.objectActions,
      };
    }
    case roleActions.REMOVE_A_LIST_OF_OBJECTS_WITH_ACTIONS: {
      return {
        ...state,
        objectActionOptions: {},
      };
    }
    case roleActions.UPDATE_VIEWED_ROLE: {
      return { ...state, viewedRole: { ...action.viewedRole } };
    }
    case roleActions.REMOVE_VIEWED_ROLE: {
      return { ...state, viewedRole: {} };
    }
    default:
      return state;
  }
}
