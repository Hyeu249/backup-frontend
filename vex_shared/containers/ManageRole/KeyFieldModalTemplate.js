import useFields from './hook/useFields';
import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';
import Field from '@iso/vex_ui/Field/Field';
import KeyField from '@iso/vex_ui/KeyField/KeyField';

const KeyFieldModalTemplate = ({
  //others
  open,
  setOpen,
  titleModal,
  okModal,
  isAllowEdit,
  confirmHandle,
  //only edit
  parentComponent = false,
  rawFields,
  setIsAllowEdit = React.useCallback(() => {}, []),
  viewedData = React.useMemo(() => {
    return {};
  }, []),
  removeViewedData = React.useCallback(() => {}, []),
}) => {
  const font_name =
    '-apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol';
  const intl = useIntl();
  const dispatch = useDispatch();

  //use
  const {
    //fields
    fields,
    key_fields,
    //button
    usingNumbers,
    //others
    errFields,
    setErrFields,
    validatePayloadHandle,
  } = useFields(confirmHandle, rawFields, titleModal);

  const fieldsKey = Object.keys(fields);
  //useEffect
  useEffect(() => {
    const isHaveData = Object.keys(viewedData).length !== 0;
    if (isAllowEdit === false && parentComponent === EDIT_MODAL) {
      if (open === true && isHaveData) {
        const fieldName = Object.keys(fields);
        Object.values(fields).forEach((field, i) => {
          const isHaveValue = viewedData[fieldName[i]] !== undefined;
          if (isHaveValue) field.setValue(viewedData[fieldName[i]]);
        });

        console.log('set all State for EditModal...!!');
      }
    }
  }, [isAllowEdit, viewedData]);
  return (
    <React.Fragment>
      <Modal
        title={titleModal}
        centered
        visible={open}
        width={600}
        onCancel={e => {
          const isXButton = ['svg', 'SPAN', 'path'].includes(e.target.tagName);
          if (isXButton) {
            setOpen(false);
          }
          if (parentComponent === EDIT_MODAL) {
            dispatch(removeViewedData());
            setOpen(false);
          }
        }}
        footer={
          isAllowEdit
            ? [
                <Button
                  key="1"
                  onClick={() => {
                    if (parentComponent === EDIT_MODAL) {
                      setIsAllowEdit(false);
                      setErrFields({});
                      return;
                    } else {
                      setOpen(false);
                    }
                  }}
                >
                  {intl.formatMessage({ id: 'text.cancel' })}
                </Button>,
                <Button
                  key="2"
                  type="primary"
                  onClick={e => validatePayloadHandle(setOpen)}
                >
                  {okModal}
                </Button>,
              ]
            : [<div key="3" style={{ height: '32px' }}></div>]
        }
      >
        {Object.values(fields).map((field, i) => {
          const fieldName = fieldsKey[i];
          return (
            <Field
              key={field.intl}
              value={field.value}
              setValue={field.setValue}
              err={errFields[fieldName]}
              setErrFields={setErrFields}
              setIsAllowEdit={setIsAllowEdit}
              underline={true}
              // need define
              field_name={fieldName}
              name={field.intl}
              disabled={field.disabled}
              fieldType={field.fieldType}
              inputType={field.inputType}
              options={field.options}
            />
          );
        })}
        {/* key field */}
        {Object.values(key_fields).map((keyField, i, f) => {
          const lengthFieldValues = f.length;
          return (
            <KeyField
              key={i}
              //field
              keyValue={keyField.keyValue}
              valueValue={keyField.valueValue}
              //setfield
              setKeyValue={keyField.setKeyValue}
              setValueValue={keyField.setValueValue}
              //options
              keyOptions={keyField.keyOptions}
              valueOptions={keyField.valueOptions}
              //others
              err={''}
              setErrFields={setErrFields}
              setIsAllowEdit={setIsAllowEdit}
              underline={i !== lengthFieldValues - 1}
            />
          );
        })}
        <Button
          className="flex-jtct-alct"
          style={{
            width: '100%',
            height: '25px',
            backgroundColor: '#1890ff',
            color: '#ffffff',
            borderRadius: '5px',
            fontFamily: font_name,
            fontWeight: 400,
            cursor: 'pointer',
          }}
          onClick={() => usingNumbers.setValue(s => s + 1)}
        >
          <div>{intl.formatMessage({ id: 'text.addAuthorization' })}</div>
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default KeyFieldModalTemplate;
