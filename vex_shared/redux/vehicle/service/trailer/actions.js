const actions = {
  //trailer
  GET_TRAILER: 'GET_TRAILER',
  INSERT_TRAILER: 'INSERT_TRAILER',
  UPDATE_TRAILER: 'UPDATE_TRAILER',
  DELETE_TRAILER: 'DELETE_TRAILER',

  LOAD_TRAILER: 'LOAD_TRAILER',
  REMOVE_TRAILER: 'REMOVE_TRAILER',
  SET_VIEWED_TRAILER: 'SET_VIEWED_TRAILER',
  UPDATE_VIEWED_TRAILER: 'UPDATE_VIEWED_TRAILER',
  REMOVE_VIEWED_TRAILER: 'REMOVE_VIEWED_TRAILER',
  //assign trailer
  ATTACH_TRAILER: 'ATTACH_TRAILER',
  DETACH_TRAILER: 'DETACH_TRAILER',

  initData: () => {
    return dispatch => {
      dispatch({ type: actions.GET_TRAILER });
    };
  },

  removeInitData: () => {
    return dispatch => {
      dispatch({ type: actions.REMOVE_TRAILER });
    };
  },

  createTrailer: payload => ({ type: actions.INSERT_TRAILER, payload }),
  updateTrailer: payload => ({ type: actions.UPDATE_TRAILER, payload }),
  deleteTrailer: trailerID => ({ type: actions.DELETE_TRAILER, trailerID }),

  setViewedTrailer: payload => ({ type: actions.SET_VIEWED_TRAILER, payload }),
  removeViewedTrailer: () => ({ type: actions.REMOVE_VIEWED_TRAILER }),
  //assign trailer
  attachTrailer: payload => ({ type: actions.ATTACH_TRAILER, payload }),
  detachTrailer: payload => ({ type: actions.DETACH_TRAILER, payload }),
};
export default actions;
