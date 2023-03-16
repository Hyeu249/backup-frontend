import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LightIcon from '@iso/vex_config/icon/LightIcon';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';

function SelectWarehouse({ warehouse, setSelectedWarehouse }) {
  const dispatch = useDispatch();
  let warehouses = useSelector(state => state.Auth.warehouses);
  const isHaveWarehouse = warehouses?.length > 0;

  if (!isHaveWarehouse) {
    warehouses = [{ name: 'Chưa có kho', id: '' }];
  }

  return (
    <CustomDropDown
      menu={warehouses.map(warehouse => {
        return {
          title: warehouse.name,
          value: warehouse.id,
          onClick: e => {
            if (isHaveWarehouse) dispatch(setSelectedWarehouse(warehouse));
          },
          Icon: <></>,
        };
      })}
    >
      <div
        className="flex-jtct-alct"
        style={{
          padding: '2px 7px',
          marginLeft: '10px',
          backgroundColor: '#81818129',
          borderRadius: '9999px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <LightIcon />
        <div
          style={{
            fontSize: '11px',
            lineHeight: '12px',
            color: '#636f73',
            fontFamily: 'var(--font-family)',
            marginLeft: '5px',
          }}
        >
          {warehouse?.name}
        </div>
      </div>
    </CustomDropDown>
  );
}

export default SelectWarehouse;
