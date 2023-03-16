import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';

const SelectionField = ({
  options,
  value,
  setIsEdit,
  setValueValue,
  setValue,
  font_name,
  style = {},
}) => {
  const intl = useIntl();
  const selectionText = intl.formatMessage({ id: 'text.searchToSelect' });
  return (
    <Select
      showSearch
      autoFocus
      defaultOpen
      bordered={false}
      value={value}
      style={{
        width: '66.666667%',
        height: '21.5px',
        fontFamily: font_name,
        fontSize: '13px',
        color: '#262C2D',
        borderRadius: '5px',
        boxSizing: 'border',
        outline: 'none',
        border: '1px solid #6cbdff',
        boxShadow: '0px 0px 0px 3px #63c2ff66 ',
        lineHeight: '20px',
        ...style,
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
      options={options}
      optionLabelProp="label"
      onSelect={e => {
        setValue(e);
        setValueValue([]);
      }}
      onBlur={() => setIsEdit(false)}
    />
  );
};

export default SelectionField;
