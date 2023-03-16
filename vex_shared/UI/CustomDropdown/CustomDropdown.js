import React from 'react';

import Dropdown from '@iso/components/uielements/dropdown';
import { DropdownWrapper } from './DropdownWrapper.style';

function CustomDropDown({ menu, children }) {
  const [selected, setSelected] = React.useState(false);
  return (
    <Dropdown
      overlay={<DropdownMenu menu={menu} setSelected={setSelected} />}
      trigger={['click']}
      visible={selected}
      onVisibleChange={() => setSelected(s => !s)}
    >
      {children}
    </Dropdown>
  );
}

export default CustomDropDown;

function DropdownMenu({ menu, setSelected }) {
  const fontFamily = `-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
  const lengthMenu = menu.length;
  return (
    <DropdownWrapper>
      {menu.map((item, i) => {
        return (
          <div
            className="flex-alct item"
            style={{
              padding: '6px 8px',
              fontSize: '14px',
              borderRadius: '5px',
              fontFamily: fontFamily,
              cursor: 'pointer',
              color: '#535859',
              borderBottom: i !== lengthMenu - 1 ? '1px solid #e8e8e8' : 'none',
            }}
            onClick={e => {
              e.stopPropagation();
              item.onClick(item.value);
              setSelected(s => !s);
            }}
            key={item.title}
          >
            <div>{item.title}</div>
            {item.Icon}
          </div>
        );
      })}
    </DropdownWrapper>
  );
}
