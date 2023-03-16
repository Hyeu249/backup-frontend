import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';
import MultipleSelectionFieldWrapper from './MultipleSelectionField.style';

const MultipleSelectionField = ({
  options,
  value,
  setIsEdit,
  setValue,
  font_name,
}) => {
  const intl = useIntl();
  const selectionText = intl.formatMessage({ id: 'text.searchToSelect' });
  return (
    <MultipleSelectionFieldWrapper>
      <Select
        mode="multiple"
        showSearch
        autoFocus
        defaultOpen
        bordered={false}
        value={value}
        className={`multipleSelectionField`}
        style={{
          fontFamily: font_name,
          maxHeight: 200,
        }}
        dropdownStyle={{ fontFamily: font_name, fontSize: '13px' }}
        placeholder={selectionText}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label?.toLowerCase() ?? '').includes(input?.toLowerCase())
        }
        filterSort={(optionA, optionB) => {
          return (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase());
        }}
        options={[...options]}
        optionLabelProp="label"
        onChange={setValue}
        onBlur={() => setIsEdit(false)}
      />
    </MultipleSelectionFieldWrapper>
  );
};

export default MultipleSelectionField;
