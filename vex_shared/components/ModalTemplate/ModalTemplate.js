import useFields from './hooks/useFields';
import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';
import Field from '@iso/vex_ui/Field/Field';

const TestTemplate = ({
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
  const intl = useIntl();
  const dispatch = useDispatch();

  //use
  const {
    //fields
    fields,
    //others
    errFields,
    setErrFields,
    callBack,
  } = useFields(confirmHandle, rawFields, titleModal);
  const { validatePayloadHandle } = callBack();
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
        {Object.values(fields).map((field, i, f) => {
          const fieldName = fieldsKey[i];
          const lengthFields = f.length;
          return (
            <Field
              key={field.intl}
              value={field.value}
              setValue={field.setValue}
              err={errFields[fieldName]}
              setErrFields={setErrFields}
              setIsAllowEdit={setIsAllowEdit}
              underline={i !== lengthFields - 1}
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
      </Modal>
    </React.Fragment>
  );
};

export default TestTemplate;
