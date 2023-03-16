const actions = {
  //vehicle image
  GET_VEHICLE_IMAGE_IN_VEHICLE: 'GET_VEHICLE_IMAGE_IN_VEHICLE',
  LOAD_VEHICLE_IMAGE_IN_VEHICLE: 'LOAD_VEHICLE_IMAGE_IN_VEHICLE',
  REMOVE_VEHICLE_IMAGE_IN_VEHICLE: 'REMOVE_VEHICLE_IMAGE_IN_VEHICLE',
  UPLOAD_IMAGE_FOR_VEHICLE: 'UPLOAD_IMAGE_FOR_VEHICLE',
  DELETE_IMAGE_FOR_VEHICLE: 'DELETE_IMAGE_FOR_VEHICLE',

  //images
  initImagesInVehicle: vehicleId => ({
    type: actions.GET_VEHICLE_IMAGE_IN_VEHICLE,
    vehicleId,
  }),
  removeImagesInVehicle: vehicleId => ({
    type: actions.REMOVE_VEHICLE_IMAGE_IN_VEHICLE,
    vehicleId,
  }),
  createVehicleImage: payload => {
    return (dispatch, getState) => {
      const vehicle = getState().vehicle.viewedVehicle;
      dispatch({
        type: actions.UPLOAD_IMAGE_FOR_VEHICLE,
        images: payload.result.vehicleImages,
        vehicleID: vehicle.id,
      });
    };
  },
  deleteVehicleImage: id => {
    return (dispatch, getState) => {
      const vehicle = getState().vehicle.viewedVehicle;
      dispatch({
        type: actions.DELETE_IMAGE_FOR_VEHICLE,
        imageIDs: [id],
        vehicleID: vehicle.id,
      });
    };
  },
};
export default actions;
