import useFields from './hooks/useFields';
import React, { useEffect } from 'react';
import { Button, Space } from 'antd';
import { useIntl } from 'react-intl';

import '@iso/cra/src/index.css';
import Field from '@iso/vex_ui/Field/Field';

import EditTemplateWrapper from './EditTemplate.style';

const EditTemplate = ({
  titleModal,
  isAllowEdit,
  confirmHandle,
  rawFields,
  setIsAllowEdit = React.useCallback(() => {}, []),
  viewedData = React.useMemo(() => {
    return {};
  }, []),
}) => {
  const intl = useIntl();

  //use
  const {
    //fields
    fields,
    //others
    errFields,
    setErrFields,
    callBack,
  } = useFields(confirmHandle, rawFields, titleModal);
  const { validatePayloadHandle } = callBack(setIsAllowEdit);
  const fieldsKey = Object.keys(fields);

  //useEffect
  useEffect(() => {
    const isHaveData = Object.keys(viewedData).length !== 0;
    if (isAllowEdit === false) {
      if (isHaveData) {
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
    <EditTemplateWrapper
      style={{
        border: '1px solid red',
        borderColor: isAllowEdit ? 'red' : '',
      }}
    >
      <h3 style={{ marginBottom: '5px' }}>
        {isAllowEdit ? titleModal : intl.formatMessage({ id: 'text.details' })}
      </h3>
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
      {isAllowEdit ? (
        <Footer
          setIsAllowEdit={setIsAllowEdit}
          validatePayloadHandle={validatePayloadHandle}
          setErrFields={setErrFields}
        />
      ) : (
        [<div key="3" style={{ height: '32px' }}></div>]
      )}
    </EditTemplateWrapper>
  );
};

export default EditTemplate;

//create footer function
const Footer = ({ setIsAllowEdit, validatePayloadHandle, setErrFields }) => {
  const intl = useIntl();
  return (
    <div style={{ display: 'flex' }}>
      <Space style={{ marginLeft: 'auto' }}>
        <Button
          key="1"
          onClick={() => {
            setIsAllowEdit(false);
            setErrFields({});
          }}
        >
          {intl.formatMessage({ id: 'text.cancel' })}
        </Button>

        <Button
          key="2"
          type="primary"
          onClick={e => validatePayloadHandle(setIsAllowEdit)}
        >
          {intl.formatMessage({ id: 'text.edit' })}
        </Button>
      </Space>
    </div>
  );
};
