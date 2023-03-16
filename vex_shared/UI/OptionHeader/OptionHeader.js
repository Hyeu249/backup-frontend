import React from 'react';

import DontKnowIcon from '@iso/vex_config/icon/DontKnowIcon';
import CustomSelect from './CustomSelect';
import BetterThreeDotIcon from '@iso/vex_config/icon/BetterThreeDotIcon';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';

function OptionHeader({
  title,
  searchPlaceholder,
  value,
  onSelect,
  searchOptions,
  menu = React.useMemo(() => [], []),
}) {
  const isHaveMenu = menu.length > 0;
  return (
    <div
      style={{ height: '100px', backgroundColor: '#ffffff', padding: '15px' }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
      >
        <h3 style={{ color: '#006cb8' }}>{title}</h3>
        <DontKnowIcon style={{ color: '#006cb8', marginLeft: '4px' }} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '5px',
        }}
      >
        <CustomSelect
          searchOptions={searchOptions}
          value={value}
          onSelect={onSelect}
          searchPlaceholder={searchPlaceholder}
        />
        {isHaveMenu && (
          <CustomDropDown menu={menu}>
            <BetterThreeDotIcon
              style={{ color: 'black' }}
              styleDiv={{
                borderRadius: '8px',
                width: '33px',
                height: '30px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            />
          </CustomDropDown>
        )}
      </div>
    </div>
  );
}

export default OptionHeader;
