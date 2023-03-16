import { put, call, select } from 'redux-saga/effects';

import notification from '@iso/components/Notification';

import actions from './actions';

import {
  uploadImageForDriverDocumentApi,
  getDriverDocumentImageApi,
  deleteImageForDriverDocumentApi,
} from './apis';

import {
  getDriverDocumentByIdApi,
  GetDocumentListByDriver,
} from '../driverDocument/apis';
import {
  addKeyByIdToObjectArray,
  toValueLabelObjectArray,
  jsonApi,
  blobApi,
} from '@iso/vex_redux/helpFunction';

//var
const SUCCESS = 200;

//images
export function* uploadDriverDocumentImages({ payload }) {
  const { driver_document_id, driver_document_images: images } = payload.result;
  //api
  for (const image of images) {
    const res = yield call(uploadImageForDriverDocumentApi, {
      image: image,
      driverDocumentId: driver_document_id,
    });

    if (res?.status === SUCCESS) {
      notification('success', 'Upload file thành công');
    } else {
      notification('error', 'Đã xãy ra lỗi Upload File, vui lòng thao tác lại');
    }

    yield put({
      type: actions.GET_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT,
      driverDocumentId: driver_document_id,
    });
  }
}

export function* deleteImageForDriverDocument(a) {
  //api
  for (const imageID of a.imageIDs) {
    const res = yield call(deleteImageForDriverDocumentApi, {
      imageID: imageID,
      driverDocumentID: a.driverDocumentID,
    });

    if (res?.status === SUCCESS) {
      notification('success', 'Xóa file thành công');
    } else {
      notification('error', 'Đã xãy ra lỗi Xóa File, vui lòng thao tác lại');
    }

    yield put({
      type: actions.GET_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT,
      driverDocumentId: a.driverDocumentID,
    });
  }
}

export function* getDriverDocumentImages({ driverId }) {
  console.log('document images: ', driverId);
  return;
  const warehouse = yield select(
    state => state.assetWarehouse.selectedWarehouse
  );
  const driverDocumentRes = yield call(
    getDriverDocumentByIdApi,
    driverDocumentId,
    warehouse.id
  );

  if (driverDocumentRes?.status === SUCCESS) {
    const data = yield call(jsonApi, driverDocumentRes);
    const image_relations = Object.values(data.result?.image_relations || {});
    const driverDocumentImages = [];

    if (image_relations?.length > 0) {
      for (const image of image_relations) {
        const imageRes = yield call(getDriverDocumentImageApi, image.id);
        if (imageRes.status === SUCCESS) {
          const imageBlob = yield call(blobApi, imageRes);
          imageBlob.url = URL.createObjectURL(imageBlob);
          imageBlob.id = image.id;
          imageBlob.value = image.id;
          imageBlob.label = image.name;
          driverDocumentImages.push(imageBlob);
        }
      }
    }

    yield put({
      type: actions.LOAD_DRIVER_DOCUMENT_IMAGE_IN_DRIVER_DOCUMENT,
      driverDocumentImages: addKeyByIdToObjectArray(driverDocumentImages),
    });
  } else {
    notification('error', 'Lỗi kéo dữ liệu, vui lòng liên hệ kỹ thuật');
  }
}
export function* getDriverDocumentOptions({ driverId }) {
  const res = yield call(GetDocumentListByDriver, driverId);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);

    const driverDocuments = toValueLabelObjectArray(value?.result);

    yield put({
      type: actions.LOAD_DRIVER_DOCUMENT_IN_DRIVER_DOCUMENT_IMAGE,
      driverDocuments,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
