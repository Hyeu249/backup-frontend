import React, { useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';

import {
  validateFields,
  validateFieldValues,
} from '@iso/vex_lib/validate/validate';
import { toKeyIdValueLabelOfStringArray } from '@iso/vex_redux/helpFunction';

const useFields = (confirmHandle, raw, who_use) => {
  const payload = cloneDeep(raw);
  const key_field_length = Object.values(payload.key_field.options).length;
  const key_fields = [];
  for (let i = 0; i < key_field_length; i++) {
    key_fields.push(cloneDeep(payload.key_field));
  }
  const usingNumbers = payload.usingNumbers;
  delete payload.key_field;
  delete payload.usingNumbers;
  const fields = payload;

  //state fields
  for (const field of Object.keys(fields)) {
    const isHaveDefaultValue = fields[field].defaultValue !== undefined;
    const defaultValue = isHaveDefaultValue ? fields[field].defaultValue : '';
    const [value, setValue] = useState(defaultValue);
    fields[field].value = value;
    fields[field].setValue = setValue;
  }
  for (const key_field of key_fields) {
    const [keyValue, setKeyValue] = useState('');
    const [valueValue, setValueValue] = useState([]);

    //set state for key
    key_field.keyValue = keyValue;
    key_field.setKeyValue = setKeyValue;
    //set state for value
    key_field.valueValue = valueValue;
    key_field.setValueValue = setValueValue;
    //set options
    key_field.keyOptions = toKeyIdValueLabelOfStringArray(
      Object.keys(key_field?.options || {})
    );
    key_field.valueOptions = toKeyIdValueLabelOfStringArray(
      key_field?.options[keyValue] || []
    );
  }
  for (const _ of Array(1)) {
    const [value, setValue] = useState(usingNumbers.defaultValue);
    usingNumbers.value = value;
    usingNumbers.setValue = setValue;
  }
  //state fields error
  const [errFields, setErrFields] = useState({});

  const validatePayloadHandle = setOpen => {
    const errFieldsFromValidate = validateFields(fields);
    const errFieldValuesFromValidate = validateFieldValues(key_fields);

    const isHaveErrFields = Object.keys(errFieldsFromValidate).length > 0;
    const isHaveErrFieldValues =
      Object.keys(errFieldValuesFromValidate).length > 0;
    if (isHaveErrFields) {
      return setErrFields(errFieldsFromValidate);
    }
    if (isHaveErrFieldValues) {
      return setErrFields(errFieldValuesFromValidate);
    }

    const cloneFields = cloneDeep(fields);
    const cloneFieldValues = cloneDeep(key_fields);
    const result = {};
    Object.keys(cloneFields).forEach(field => {
      result[field] = cloneFields[field].value;
    });
    result.auth_object_actions_list = cloneFieldValues
      .filter(v => v.keyValue.length > 0)
      .map(v => {
        return { object: v.keyValue, actions: v.valueValue };
      });

    //after successfully validate, this handle will be called
    confirmHandle.call({
      result: result,
      setErrFields: setErrFields,
      setOpen: setOpen,
    });

    return true;
  };

  return {
    //fields
    fields,
    key_fields: key_fields.slice(0, usingNumbers.value),
    //button
    usingNumbers,
    //others
    errFields,
    setErrFields,
    validatePayloadHandle,
  };
};

export default useFields;
