import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';

import {
  uploadImageForVehicleApi,
  getVehicleImageApi,
  deleteImageForVehicleApi,
} from './apis';

import { getVehicleByIdApi } from '../vehicle/apis';

import {
  addKeyByIdToObjectArray,
  jsonApi,
  blobApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;

//images
export function* uploadImageForVehicle(a) {
  //api
  for (const image of a.images) {
    const res = yield call(uploadImageForVehicleApi, {
      image: image,
      vehicleID: a.vehicleID,
    });

    if (res?.status === SUCCESS) {
      notification('success', 'Upload file thành công');
    } else {
      notification('error', 'Đã xãy ra lỗi Upload File, vui lòng thao tác lại');
    }

    yield put({
      type: actions.GET_VEHICLE_IMAGE_IN_VEHICLE,
      vehicleId: a.vehicleID,
    });
  }
}

export function* deleteImageForVehicle(a) {
  //api
  for (const imageID of a.imageIDs) {
    const res = yield call(deleteImageForVehicleApi, {
      imageID: imageID,
      vehicleID: a.vehicleID,
    });

    if (res?.status === SUCCESS) {
      notification('success', 'Xóa file thành công');
    } else {
      notification('error', 'Đã xãy ra lỗi Xóa File, vui lòng thao tác lại');
    }

    yield put({
      type: actions.GET_VEHICLE_IMAGE_IN_VEHICLE,
      vehicleId: a.vehicleID,
    });
  }
}

export function* getImagesInVehicle({ vehicleId }) {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const vehicleRes = yield call(getVehicleByIdApi, vehicleId, warehouse.id);

  if (vehicleRes?.status === SUCCESS) {
    const data = yield call(jsonApi, vehicleRes);
    const image_relations = Object.values(data.result?.image_relations || {});
    const vehicleImages = [];

    if (image_relations?.length > 0) {
      for (const image of image_relations) {
        const imageRes = yield call(getVehicleImageApi, image.id);
        if (imageRes.status === SUCCESS) {
          const imageBlob = yield call(blobApi, imageRes);
          imageBlob.url = URL.createObjectURL(imageBlob);
          imageBlob.id = image.id;
          imageBlob.value = image.id;
          imageBlob.label = image.name;
          vehicleImages.push(imageBlob);
        }
      }
    }

    yield put({
      type: actions.LOAD_VEHICLE_IMAGE_IN_VEHICLE,
      vehicleImages: addKeyByIdToObjectArray(vehicleImages),
    });
  } else {
    notification('error', 'Lỗi kéo dữ liệu, vui lòng liên hệ kỹ thuật');
  }
}
