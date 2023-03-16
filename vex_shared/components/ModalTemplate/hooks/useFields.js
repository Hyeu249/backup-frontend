import React, { useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';

import { validateFields } from '@iso/vex_lib/validate/validate';

const useFields = (confirmHandle, fields, who_use) => {
  //state fields
  for (const field of Object.keys(fields)) {
    const isHaveDefaultValue = fields[field].defaultValue !== undefined;
    const defaultValue = isHaveDefaultValue ? fields[field].defaultValue : '';
    const [value, setValue] = useState(defaultValue);
    fields[field].value = value;
    fields[field].setValue = setValue;
  }
  // get value to see if it changed
  const dependencyCallBack = Object.values(fields).map(field => field.value);
  //state fields error
  const [errFields, setErrFields] = useState({});

  const callBack = useCallback(() => {
    const validatePayloadHandle = setOpen => {
      const errFieldsFromValidate = validateFields(fields);

      const isHaveErrFields = Object.keys(errFieldsFromValidate).length > 0;
      if (isHaveErrFields) {
        return setErrFields(errFieldsFromValidate);
      }

      const cloneFields = cloneDeep(fields);
      const result = {};
      Object.keys(cloneFields).forEach(field => {
        result[field] = cloneFields[field].value;
      });

      //after successfully validate, this handle will be called
      confirmHandle.call({
        result: result,
        setErrFields: setErrFields,
        setOpen: setOpen,
      });

      return true;
    };
    return { validatePayloadHandle };
  }, [...dependencyCallBack]);

  return {
    //fields
    fields,
    //others
    errFields,
    setErrFields,
    callBack,
  };
};

export default useFields;
