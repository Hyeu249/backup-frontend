import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';

import {
  uploadImageForTyreApi,
  getTyreImageApi,
  deleteImageForTyreApi,
} from './apis';

import { getTyreByIdApi } from '../tyre/apis';

import {
  addKeyByIdToObjectArray,
  jsonApi,
  blobApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;

//images
export function* uploadImageForTyre(a) {
  //api
  for (const image of a.images) {
    const res = yield call(uploadImageForTyreApi, {
      image: image,
      tyreID: a.tyreID,
    });

    if (res?.status === SUCCESS) {
      notification('success', 'Upload file thành công');
    } else {
      notification('error', 'Đã xãy ra lỗi Upload File, vui lòng thao tác lại');
    }

    yield put({
      type: actions.GET_TYRE_IMAGE_IN_TYRE,
      tyreId: a.tyreID,
    });
  }
}

export function* deleteImageForTyre(a) {
  //api
  for (const imageID of a.imageIDs) {
    const res = yield call(deleteImageForTyreApi, {
      imageID: imageID,
      tyreID: a.tyreID,
    });

    if (res?.status === SUCCESS) {
      notification('success', 'Xóa file thành công');
    } else {
      notification('error', 'Đã xãy ra lỗi Xóa File, vui lòng thao tác lại');
    }

    yield put({
      type: actions.GET_TYRE_IMAGE_IN_TYRE,
      tyreId: a.tyreID,
    });
  }
}

export function* getImagesInTyre({ tyreId }) {
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const tyreRes = yield call(getTyreByIdApi, tyreId, warehouse.id);

  if (tyreRes?.status === SUCCESS) {
    const data = yield call(jsonApi, tyreRes);
    const image_relations = Object.values(data.result?.image_relations || {});
    const tyreImages = [];

    if (image_relations?.length > 0) {
      for (const image of image_relations) {
        const imageRes = yield call(getTyreImageApi, image.id);
        if (imageRes.status === SUCCESS) {
          const imageBlob = yield call(blobApi, imageRes);
          imageBlob.url = URL.createObjectURL(imageBlob);
          imageBlob.id = image.id;
          imageBlob.value = image.id;
          imageBlob.label = image.name;
          tyreImages.push(imageBlob);
        }
      }
    }

    yield put({
      type: actions.LOAD_TYRE_IMAGE_IN_TYRE,
      tyreImages: addKeyByIdToObjectArray(tyreImages),
    });
  } else {
    notification('error', 'Lỗi kéo dữ liệu, vui lòng liên hệ kỹ thuật');
  }
}
