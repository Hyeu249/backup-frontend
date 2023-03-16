import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';

import CustomSelectWrapper from './CustomSelect.style';
import SearchIcon from '@iso/vex_config/icon/SearchIcon';

const CustomSelect = ({
  onSelect,
  searchOptions,
  value,
  searchPlaceholder = false,
}) => {
  const intl = useIntl();
  const defaultPlaceholder = intl.formatMessage({
    id: 'ui.dropdown.search',
  });
  const font_name =
    '-apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol';
  return (
    <CustomSelectWrapper>
      <Select
        showSearch
        suffixIcon={() => <SearchIcon size="20" />}
        bordered={false}
        value={value}
        style={{
          width: '240px',
          height: '30.5px',
          fontFamily: font_name,
          fontSize: '13px',
          color: '#262C2D',
          borderRadius: '5px',
          boxSizing: 'border',
          outline: 'none',
          border: '1px solid #6cbdff',
          ':hover': { boxShadow: '0px 0px 0px 3px #63c2ff66' },
        }}
        dropdownStyle={{ fontFamily: font_name, fontSize: '13px' }}
        placeholder={searchPlaceholder || defaultPlaceholder}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label?.toLowerCase() ?? '').includes(input?.toLowerCase())
        }
        filterSort={(optionA, optionB) => {
          return (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase());
        }}
        options={searchOptions}
        optionLabelProp="label"
        onSelect={e => onSelect(e)}
      />
    </CustomSelectWrapper>
  );
};

export default React.memo(CustomSelect);
