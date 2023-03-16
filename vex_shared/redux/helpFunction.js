import { cloneDeep } from 'lodash';

export const getDeleteImagesAndUploadImages = (newImages, oldImages) => {
  const cloneNewImages = cloneDeep(newImages);
  const cloneOldImages = cloneDeep(oldImages);
  const imagesNeedDelete = cloneOldImages.filter(oldImage => {
    return !cloneNewImages.some(newImage => newImage.id === oldImage.id);
  });
  const imagesNeedUpload = cloneNewImages.filter(newImage => {
    return !cloneOldImages.some(oldImage => oldImage.id === newImage.id);
  });

  return {
    deleteImageIds: imagesNeedDelete.map(image => image.id),
    uploadImages: imagesNeedUpload,
  };
};

export function callSetErrFieldsWhenHaveErr(
  message,
  setErrFields,
  fields,
  errFields
) {
  const cloneFields = cloneDeep(fields);
  const messageSplit = message?.split(' ')?.map(v => v.toLowerCase()) || [];

  Object.keys(errFields).forEach((text, i) => {
    if (messageSplit?.includes(text)) {
      setErrFields({
        [cloneFields[i]]: errFields[text],
      });
    }
  });
}

export function addKeyByIdToObjectArray(array) {
  const cloneArray = cloneDeep(array);
  if (cloneArray?.length === 0) return [];
  return (
    cloneArray?.map(d => {
      d.key = d.id;
      return d;
    }) || []
  );
}

export function toValueLabelObjectArray(array) {
  const cloneArray = cloneDeep(array);
  const newArray = [];

  cloneArray?.forEach(d => {
    if (d.name !== undefined) {
      newArray.push({
        value: d.id,
        label: d.name,
      });
    } else {
      if (d.first_name !== undefined) {
        newArray.push({
          value: d.id,
          label: d.first_name + ' ' + d.last_name,
        });
      } else {
        newArray.push({
          value: d.id,
          label: d.id,
        });
      }
    }
  });

  return newArray;
}

export const getFieldsNeedToUpdate = (neW, old) => {
  const cloneNew = cloneDeep(neW);
  const cloneOld = cloneDeep(old);
  if (cloneNew.length === 0) return {};

  const fieldsNeedToUpdate = {};

  const getEditedFields = Object.keys(cloneNew).filter(v => {
    return cloneNew[v] !== cloneOld[v];
  });
  getEditedFields.forEach(key => {
    fieldsNeedToUpdate[key] = cloneNew[key];
  });
  return fieldsNeedToUpdate;
};

export function addLabelFieldFromMatchedArgumentB(array, b, needField) {
  const cloneArray = cloneDeep(array);
  const cloneB = cloneDeep(b);
  const newArr = cloneArray.map(d => {
    const neededType = cloneB.filter(t => t.value === d[needField]);
    if (neededType.length > 0) {
      d.value = d.id;
      d.label = neededType[0].label;
    }
    return d;
  });

  return newArr;
}

export function addLabelValueField(array) {
  const newArray = cloneDeep(array);

  newArray?.map(d => {
    d.value = d.id;
    d.label = d.name;
    return d;
  });

  return newArray;
}

export const jsonApi = async res => {
  const data = await res.json();
  return data;
};

export const blobApi = async res => {
  const data = await res.blob();
  return data;
};

export const removeRequiredFields = field => {
  return field?.split('(')[0];
};

export const removeSomeField = (raw, fields) => {
  const data = cloneDeep(raw);

  return data.map(d => {
    for (const field of fields) {
      delete d[field];
    }
    return d;
  });
};

export function toKeyIdValueLabelOfStringArray(raw) {
  const array = cloneDeep(raw);
  if (array?.length === 0) return [];
  return array.map(raw => {
    return { key: raw, id: raw, value: raw, label: raw };
  });
}
