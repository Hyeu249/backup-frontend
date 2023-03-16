import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Link, useRouteMatch } from 'react-router-dom';

import message from '@iso/components/uielements/message';
import { DropdownMenu, MenuItem } from '@iso/components/uielements/dropdown';
import { DeleteIcon } from '@iso/config/icon.config';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import actions from '@iso/vex_redux/equipment/service/equipment/actions';

const useManageEquipment = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const { initData, removeInitData, deleteEquipment } = actions;

  const { equipments, equipmentGroups, maintenanceTypes } = useSelector(
    state => state.equipment
  );
  const selectedWarehouse = useSelector(
    state => state.assetWarehouse.selectedWarehouse
  );
  const [selected, setSelected] = React.useState([]);

  //state
  const [createOpen, setCreateOpen] = useState(false);

  React.useEffect(() => {
    dispatch(initData());
    return () => {
      dispatch(removeInitData());
    };
  }, [dispatch, selectedWarehouse.id]);

  const rowSelection = {
    hideDefaultSelections: true,
    selectedRowKeys: selected,
    onChange: selected => setSelected(selected),
    selections: [
      {
        key: 'all-data',
        text: 'Select All',
        onSelect: () =>
          setSelected(equipments.map(equipments => equipments.key)),
      },
      {
        key: 'no-data',
        text: 'Unselect all',
        onSelect: () => setSelected([]),
      },
      {
        key: 'delete-selected',
        text: 'Delete selected',
        onSelect: allRecordKeys => {
          if (selected.length > 0) {
            const removeValFromIndex = [];

            setSelected(selected => {
              selected.forEach(v =>
                removeValFromIndex.push(allRecordKeys.indexOf(v))
              );
              removeValFromIndex.sort((a, b) => a - b);
              const recordKeyAfterDelPhase = [...allRecordKeys];

              for (var i = removeValFromIndex.length - 1; i >= 0; i--) {
                recordKeyAfterDelPhase.splice(removeValFromIndex[i], 1);
              }

              return [];
            });
          }
        },
      },
    ],
    onSelection: selected => setSelected(selected),
  };

  const columns = [
    {
      title: intl.formatMessage({ id: 'text.maintenanceType' })?.split('(')[0],
      dataIndex: 'maintenance_type_id',
      rowKey: 'maintenance_type_id',
      width: 'auto',
      render: value => {
        let text;
        const filtered = maintenanceTypes.filter(d => d.value === value);
        if (filtered.length > 0) {
          text = filtered[0].label;
        }
        return <span>{text}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'text.equipmentGroup' })?.split('(')[0],
      dataIndex: 'equipment_group_id',
      rowKey: 'equipment_group_id',
      width: 'auto',
      render: value => {
        let text;
        const filtered = equipmentGroups.filter(d => d.value === value);
        if (filtered.length > 0) {
          text = filtered[0].label;
        }
        return <span>{text}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'text.equipmentName' })?.split('(')[0],
      dataIndex: 'name',
      rowKey: 'name',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.equipmentDescription' })
        ?.split('(')[0],
      dataIndex: 'description',
      rowKey: 'description',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.equipmentManufacturer' })
        ?.split('(')[0],
      dataIndex: 'manufacturer',
      rowKey: 'manufacturer',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.equipmentIsReusable' })
        ?.split('(')[0],
      dataIndex: 'is_reusable',
      rowKey: 'is_reusable',
      width: 'auto',
      render: (value, b) => {
        const text = value ? 'Yes' : 'No';
        return <span>{`${text}`}</span>;
      },
    },
    {
      title: intl
        .formatMessage({ id: 'text.equipmentMaintenanceCycleKm' })
        ?.split('(')[0],
      dataIndex: 'maintenance_cycle_km',
      rowKey: 'maintenance_cycle_km',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.equipmentMaintenanceCycleHour' })
        ?.split('(')[0],
      dataIndex: 'maintenance_cycle_hour',
      rowKey: 'maintenance_cycle_hour',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '10%',
      render: (text, equipment) => (
        <div className="isoBtnView">
          {/* view button */}
          <Link to={`${match.path}/${equipment.id}`}>
            <Button color="primary" className="ViewBtn">
              <IntlMessages id="text.view" />
            </Button>
          </Link>
          {/* delete button */}
          <Button
            className="DltBtn"
            onClick={() => {
              console.log('deleted equipment_id: ', equipment.id);
              dispatch(deleteEquipment(equipment.id));
            }}
          >
            <DeleteIcon size={18} />
          </Button>
        </div>
      ),
    },
  ];
  //callback
  const callBack = useCallback(() => {
    const handleButtonClick = e => {
      const plainText = intl.formatMessage({ id: 'message.clickThreeDot' });
      message.info(plainText);
    };

    const handleMenuClickToLink = e => {
      if (e.key == 1) {
        message.info('Bắt đầu tìm kiếm.');
      }
      if (e.key == 2) {
        message.info('Bắt đầu xóa theo danh sách chọn.');
      }
    };

    const dropdownMenu = () => {
      return (
        <DropdownMenu
          onClick={handleMenuClickToLink}
          style={{ borderRadius: '5px', padding: '10px' }}
        >
          <MenuItem
            key="1"
            style={{
              borderBottom: '1px solid #dadada',
              color: '#6a6a6a',
            }}
          >
            <IntlMessages id="ui.dropdown.search" />
          </MenuItem>
          <MenuItem key="2" style={{ color: '#6a6a6a' }}>
            <IntlMessages id="ui.dropdown.deleteSelected" />
          </MenuItem>
        </DropdownMenu>
      );
    };

    return { handleButtonClick, handleMenuClickToLink, dropdownMenu };
  }, []);

  return {
    createOpen,
    setCreateOpen,
    equipments,
    rowSelection,
    columns,
    callBack,
  };
};

export default useManageEquipment;
