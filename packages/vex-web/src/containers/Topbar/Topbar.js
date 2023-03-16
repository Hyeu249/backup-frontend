import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import TopbarWrapper from './Topbar.styles';
import { TopbarMenuIcon } from '@iso/config/icon.config';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';
import ArrowSelectIcon from '@iso/vex_config/icon/ArrowSelectIcon';

import warehouseAction from '@iso/vex_redux/assetWarehouse/actions';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(
    () => dispatch(toggleCollapsed()),
    [dispatch]
  );
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 60,
  };
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={handleToggle}
          >
            <TopbarMenuIcon size={24} color={customizedTheme.textColor} />
          </button>
        </div>
        <ul className="isoRight">
          <RegionSelector />
          <Notify />
        </ul>
      </Header>
    </TopbarWrapper>
  );
}

function RegionSelector() {
  const warehouses =
    useSelector(state => state.assetWarehouse.warehouses) || [];
  const selectedWarehouse = useSelector(
    state => state.assetWarehouse.selectedWarehouse
  );
  const dispatch = useDispatch();
  const { setSelectedWarehouse } = warehouseAction;
  const defaultWarehouseId = process.env.REACT_APP_DEFAULT_WAREHOUSE_ID;
  let myWarehouseId;

  for (const warehouse of warehouses) {
    if (warehouse.id === defaultWarehouseId) {
      myWarehouseId = defaultWarehouseId;
    }
  }
  useEffect(() => {
    if (typeof myWarehouseId === 'string' && myWarehouseId.length > 0) {
      dispatch(setSelectedWarehouse(myWarehouseId));
    }
  }, [dispatch, setSelectedWarehouse, myWarehouseId]);

  const fontFamily =
    'system-ui,-apple-system,BlinkMacSystemFont,Segoe UI, Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif, "Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol, "Noto Color Emoji"';

  return (
    <CustomDropDown
      menu={warehouses.map(warehouse => {
        return {
          title: warehouse.name,
          value: warehouse.id,
          onClick: e => dispatch(setSelectedWarehouse(e)),
          Icon: <></>,
        };
      })}
    >
      <div
        style={{
          display: 'flex',
          userSelect: 'none',
          fontFamily: fontFamily,
          cursor: 'pointer',
        }}
      >
        <div>
          {selectedWarehouse.name ? selectedWarehouse.name : 'Kho tài sản'}
        </div>
        <ArrowSelectIcon size="20px" />
      </div>
    </CustomDropDown>
  );
}

function Notify() {
  return (
    <div
      style={{
        backgroundColor: 'orange',
      }}
    >
      Notification
    </div>
  );
}
