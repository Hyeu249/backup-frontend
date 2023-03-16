import React, { useState, useCallback } from 'react';

import { errText } from '../../../redux/driverDocumentType/helpFunction';
const { EMPTY, NaT } = errText;
import {
  isEmpty,
  isNotAString,
  isOneOfTheseNotAString,
  isOneOfTheseEmpty,
} from '@iso/lib/validate/validate';

const useFields = (confirmHandle, who_use) => {
  console.log('who use: ', who_use);
  //state fields

  const [name, setName] = useState('test');
  const [description, setDescription] = useState('test');
  const [is_required, setisRequired] = useState(true);

  //state fields error
  const [errFields, setErrFields] = useState({});

  const callBack = useCallback(() => {
    const validatePayloadHandle = setOpen => {
      const errPayload = {};

      //check if empty
      if (isEmpty(name)) errPayload.name = EMPTY;
      if (isEmpty(is_required)) errPayload.is_required = EMPTY;

      //If have fields empty then RETUR
      const isHaveFieldsEmpty = isOneOfTheseEmpty([name, is_required]);

      if (isHaveFieldsEmpty) {
        return setErrFields(errPayload);
      }

      //check if string
      if (isNotAString(name)) errPayload.name = NaT;

      const isHaveFieldsNotAString = isOneOfTheseNotAString([name]);

      //If have fields not string then RETURN
      if (isHaveFieldsNotAString) {
        return setErrFields(errPayload);
      }

      console.log('done!');

      //after successfully validate, this handle will be called
      confirmHandle.call({
        driverDocumentType: {
          name: name,
          description: description,
          is_required: is_required,
        },
        setErrFields: setErrFields,
        setOpen: setOpen,
      });

      return false;
    };
    return { validatePayloadHandle };
  }, [name, description, is_required]);

  return {
    //fields
    name,
    description,
    is_required,
    //setFields
    setName,
    setDescription,
    setisRequired,
    //others
    errFields,
    setErrFields,
    callBack,
  };
};

export default useFields;
