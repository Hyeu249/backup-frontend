import React, { useState, memo } from 'react';

import EditInput from './EditInput';
import SelectionInput from './SelectionInput';
import UploadInput from './UploadInput';
import EditLayer from './EditLayer';
import FileLayer from './FileLayer';
import MultipleSelectionLayer from './MultipleSelectionLayer';
import MultipleSelectionField from './MultiSelectionField';

const Field = ({
  value,
  setValue = React.useCallback(() => {}, []),
  name = '',
  underline = false,
  options = React.useMemo(() => [], []),
  inputType = '',
  err = '',
  setErrFields = React.useCallback(() => {}, []),
  field_name = '',
  setIsAllowEdit = React.useCallback(() => {}, []),
  fieldType = 'input',
  disabled = false,
}) => {
  const font_name =
    '-apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol';
  //state
  const [isEdit, setIsEdit] = useState(false);

  let component;
  let layer;
  switch (fieldType) {
    case 'input':
      component = (
        <EditInput
          value={value}
          setIsEdit={setIsEdit}
          setValue={setValue}
          font_name={font_name}
          inputType={inputType}
        />
      );
      break;
    case 'select':
      component = (
        <SelectionInput
          value={value}
          setValue={setValue}
          options={options}
          setIsEdit={setIsEdit}
          font_name={font_name}
        />
      );
      break;
    case 'multiple select':
      component = (
        <MultipleSelectionField
          value={value}
          setValue={setValue}
          options={options}
          setIsEdit={setIsEdit}
          font_name={font_name}
        />
      );
      break;
    case 'upload':
      component = (
        <UploadInput value={value} setValue={setValue} setIsEdit={setIsEdit} />
      );
      break;
    case 'date':
      break;
  }

  switch (fieldType) {
    case 'upload':
      layer = (
        <FileLayer
          font_name={font_name}
          value={value}
          setValue={setValue}
          setIsEdit={setIsEdit}
          setIsAllowEdit={setIsAllowEdit}
          err={err}
          setErrFields={setErrFields}
          field_name={field_name}
        />
      );
      break;
    case 'multiple select':
      layer = (
        <MultipleSelectionLayer
          value={value}
          setIsEdit={setIsEdit}
          font_name={font_name}
          options={options}
          err={err}
          setErrFields={setErrFields}
          field_name={field_name}
          setIsAllowEdit={setIsAllowEdit}
          disabled={disabled}
        />
      );
      break;
    default:
      layer = (
        <EditLayer
          value={value}
          setIsEdit={setIsEdit}
          font_name={font_name}
          fieldType={fieldType}
          options={options}
          err={err}
          setErrFields={setErrFields}
          field_name={field_name}
          setIsAllowEdit={setIsAllowEdit}
          disabled={disabled}
          inputType={inputType}
        />
      );
  }

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
        style={{
          fontFamily: font_name,
          fontSize: '13px',
          color: '#636f73',
          height: '25px',
        }}
      >
        {name}
      </div>
      {!isEdit && layer}
      {isEdit && component}
    </div>
  );
};

export default memo(Field);
