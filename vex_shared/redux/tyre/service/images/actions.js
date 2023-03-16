const actions = {
  //tyre image
  GET_TYRE_IMAGE_IN_TYRE: 'GET_TYRE_IMAGE_IN_TYRE',
  LOAD_TYRE_IMAGE_IN_TYRE: 'LOAD_TYRE_IMAGE_IN_TYRE',
  REMOVE_TYRE_IMAGE_IN_TYRE: 'REMOVE_TYRE_IMAGE_IN_TYRE',
  UPLOAD_IMAGE_FOR_TYRE: 'UPLOAD_IMAGE_FOR_TYRE',
  DELETE_IMAGE_FOR_TYRE: 'DELETE_IMAGE_FOR_TYRE',

  //images
  initImagesInTyre: tyreId => ({
    type: actions.GET_TYRE_IMAGE_IN_TYRE,
    tyreId,
  }),
  removeImagesInTyre: tyreId => ({
    type: actions.REMOVE_TYRE_IMAGE_IN_TYRE,
    tyreId,
  }),
  createTyreImage: payload => {
    return (dispatch, getState) => {
      const tyre = getState().tyre.viewedTyre;
      dispatch({
        type: actions.UPLOAD_IMAGE_FOR_TYRE,
        images: payload.result.tyreImages,
        tyreID: tyre.id,
      });
    };
  },
  deleteTyreImage: id => {
    return (dispatch, getState) => {
      const tyre = getState().tyre.viewedTyre;
      dispatch({
        type: actions.DELETE_IMAGE_FOR_TYRE,
        imageIDs: [id],
        tyreID: tyre.id,
      });
    };
  },
};
export default actions;
