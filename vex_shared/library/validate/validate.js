import { cloneDeep } from 'lodash';

import {
  STRING,
  NUMBER,
  IMAGE,
  LIST,
  EMAIL,
} from '@iso/vex_containers/constants';

// const text for validate
const EMPTY = 'Không được bỏ trống, vui lòng nhập lại';
const NaT = 'Dữ liệu không có chữ hoặc ký tự, vui lòng nhập lại';
const NAN = 'Dữ liệu phải là số, vui lòng nhập lại';
const NaE = 'Dữ liệu phải là Email, vui lòng nhập lại';
const NOT_GTE = 'Giá trị thấp hơn yêu cầu, vui lòng nhập lại';
const NOT_HAVE_IMAGE = 'Không có dữ liệu hình ảnh, vui lòng tải lại';
const NOT_HAVE_LIST = 'Danh sách trống, vui lòng chọn lại';

//isEmpty use for string
export const isEmpty = field => field === '';
//not apply for 'string number' that have comma
export const isNotAString = field => typeof field !== 'string';
// export const isNotAString = field => +field || field == '0';
//not apply for 'string number' that have comma
export const isNotANumber = field => {
  if (typeof field === 'boolean') return true;
  return !+field && field != '0';
};
export const isNotEmail = field => !field.includes('@');
export const isNotGte0 = field => field <= 0;
export const isNotGteN = (field, n) => field <= n;

export const isOneOfTheseNotAString = fs => fs.some(f => typeof f !== 'string');
// export const isOneOfTheseNotAString = fs => fs.some(f => +f || f == '0');
export const isOneOfTheseNotANumber = fs => fs.some(f => !+f && f != '0');
export const isOneOfTheseEmpty = fields => fields.some(f => f === '');
export const isOneOfTheseNotGte0 = fields => fields.some(f => f <= 0);
export const isOneOfTheseNotGteN = (fields, n) => fields.some(f => f <= n);

export function validateFields(payload) {
  const clonePayload = cloneDeep(payload);
  const errPayload = {};
  const fieldsNameArr = Object.keys(clonePayload);
  //check if empty
  const fieldsCheckEmpty = fieldsNameArr.filter(
    field => clonePayload[field].validate?.required === true
  );
  //push to errPayload if there are empty fields
  fieldsCheckEmpty.forEach(field => {
    if (isEmpty(clonePayload[field].value)) errPayload[field] = EMPTY;
  });
  //check if images or list
  const fieldsCheckImageAndList = fieldsNameArr.filter(field => {
    const result = clonePayload[field];
    return (
      (result.type === IMAGE || result.type === LIST) &&
      result.validate?.required === true
    );
  });
  //push to errPayload if there are empty images or list
  fieldsCheckImageAndList.forEach(field => {
    const result = clonePayload[field];

    if (result.type === IMAGE) {
      const isHaveImages = result.value?.length > 0;
      if (!isHaveImages) errPayload[field] = NOT_HAVE_IMAGE;
    }
    if (result.type === LIST) {
      const isHaveList = result.value?.length > 0;
      if (!isHaveList) errPayload[field] = NOT_HAVE_LIST;
    }
  });
  //return errPayload if there are empty;
  let isError = Object.values(errPayload).length > 0;
  if (isError) return errPayload;

  //check if string
  const fieldsCheckString = fieldsNameArr.filter(
    field =>
      clonePayload[field].type === STRING &&
      clonePayload[field].validate?.required === true
  );

  //push to errPayload if there are not string fields
  fieldsCheckString.forEach(field => {
    if (isNotAString(clonePayload[field].value)) errPayload[field] = NaT;
  });

  //check if number
  const fieldsCheckNumber = fieldsNameArr.filter(
    field =>
      clonePayload[field].type === NUMBER &&
      clonePayload[field].validate?.required === true
  );

  //push to errPayload if there are not number fields
  fieldsCheckNumber.forEach(field => {
    if (isNotANumber(clonePayload[field].value)) errPayload[field] = NAN;
  });

  //check if email
  const fieldsCheckEmail = fieldsNameArr.filter(
    field =>
      clonePayload[field].type === EMAIL &&
      clonePayload[field].validate?.required === true
  );

  //push to errPayload if there are not email fields
  fieldsCheckEmail.forEach(field => {
    if (isNotEmail(clonePayload[field].value)) errPayload[field] = NaE;
  });

  isError = Object.values(errPayload).length > 0;
  if (isError) return errPayload;
  //check if number > 0
  const fieldsCheckGteN = fieldsNameArr.filter(field => {
    return (
      clonePayload[field].type === NUMBER &&
      !isNotANumber(clonePayload[field].validate?.gte)
    );
  });
  //push to errPayload if there are not gte
  fieldsCheckGteN.forEach(field => {
    const n = clonePayload[field].validate.gte;
    if (isNotGteN(clonePayload[field].value, n)) errPayload[field] = NOT_GTE;
  });
  isError = Object.values(errPayload).length > 0;
  if (isError) return errPayload;

  return errPayload;
}
export function validateFieldValues(raw) {
  const payload = cloneDeep(raw);
  const errPayload = {};

  return errPayload;
}
