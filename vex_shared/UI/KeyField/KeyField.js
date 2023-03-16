import React, { useState, memo } from 'react';

import SelectionInput from './SelectionInput';
import EditLayer from './EditLayer';
import MultipleSelectionLayer from './MultipleSelectionLayer';
import MultipleSelectionField from './MultiSelectionField';

const KeyField = ({
  //field
  keyValue,
  valueValue,
  //setField
  setKeyValue,
  setValueValue,
  //options
  keyOptions,
  valueOptions,
  //others
  field_name = '',
  err = '',
  setErrFields = React.useCallback(() => {}, []),
  setIsAllowEdit = React.useCallback(() => {}, []),
  disabled = false,
  underline = true,
}) => {
  const font_name =
    '-apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol';
  //state
  const [isEditKey, setIsEditKey] = useState(false);
  const [isEditValue, setIsEditValue] = useState(false);

  const keyComponent = (
    <SelectionInput
      style={{ width: '100%' }}
      value={keyValue}
      setValue={setKeyValue}
      setValueValue={setValueValue}
      options={keyOptions}
      setIsEdit={setIsEditKey}
      font_name={font_name}
    />
  );
  const keyLayer = (
    <EditLayer
      style={{ width: '100%' }}
      value={keyValue}
      setIsEdit={setIsEditKey}
      font_name={font_name}
      options={keyOptions}
      err={err}
      setErrFields={setErrFields}
      field_name={field_name}
      setIsAllowEdit={setIsAllowEdit}
      disabled={disabled}
    />
  );

  const valueComponent = (
    <MultipleSelectionField
      value={valueValue}
      setValue={setValueValue}
      options={valueOptions}
      setIsEdit={setIsEditValue}
      font_name={font_name}
    />
  );
  const valueLayer = (
    <MultipleSelectionLayer
      value={valueValue}
      setIsEdit={setIsEditValue}
      font_name={font_name}
      options={valueOptions}
      //others
      err={err}
      setErrFields={setErrFields}
      field_name={field_name}
      setIsAllowEdit={setIsAllowEdit}
      disabled={disabled}
    />
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0px',
        borderBottom: underline ? '1px solid #e7e7e7' : '',
      }}
    >
      <div
        className="flex-jtct-alct"
        style={{
          fontFamily: font_name,
          fontSize: '13px',
          color: '#636f73',
          flex: 1,
          height: '25px',
        }}
      >
        {!isEditKey && keyLayer}
        {isEditKey && keyComponent}
      </div>
      {!isEditValue && valueLayer}
      {isEditValue && valueComponent}
    </div>
  );
};

export default memo(KeyField);
