import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Link, useRouteMatch } from 'react-router-dom';

import message from '@iso/components/uielements/message';
import { DropdownMenu, MenuItem } from '@iso/components/uielements/dropdown';
import { DeleteIcon } from '@iso/config/icon.config';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import actions from '@iso/vex_redux/equipmentServiceRequest/service/equipmentServiceRequest/actions';

const useManageEquipmentServiceRequest = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const { initData, removeInitData, deleteEquipmentServiceRequest } = actions;

  const equipmentServiceRequests = useSelector(
    state => state.equipmentServiceRequest.equipmentServiceRequests
  );
  const [selected, setSelected] = React.useState([]);
  //state
  const [createOpen, setCreateOpen] = useState(false);

  React.useEffect(() => {
    dispatch(initData());
    return () => {
      dispatch(removeInitData());
    };
  }, [dispatch]);

  const rowSelection = {
    hideDefaultSelections: true,
    selectedRowKeys: selected,
    onChange: selected => setSelected(selected),
    selections: [
      {
        key: 'all-data',
        text: 'Select All',
        onSelect: () =>
          setSelected(
            equipmentServiceRequests.map(
              equipmentServiceRequests => equipmentServiceRequests.key
            )
          ),
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
      title: intl
        .formatMessage({ id: 'text.equipmentServiceRequestPlannedServiceTime' })
        ?.split('(')[0],
      dataIndex: 'planned_service_time',
      rowKey: 'planned_service_time',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.equipmentServiceRequestActualServiceTime' })
        ?.split('(')[0],
      dataIndex: 'actual_service_time',
      rowKey: 'actual_service_time',
      width: 'auto',
      render: text => <span>{text}</span>,
    },

    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '10%',
      render: (text, equipmentServiceRequest) => (
        <div className="isoBtnView">
          {/* view button */}
          <Link to={`${match.path}/${equipmentServiceRequest.id}`}>
            <Button color="primary" className="ViewBtn">
              <IntlMessages id="text.view" />
            </Button>
          </Link>
          {/* delete button */}
          <Button
            className="DltBtn"
            onClick={() => {
              console.log(
                'deleted equipmentServiceRequest_id: ',
                equipmentServiceRequest.id
              );
              dispatch(
                deleteEquipmentServiceRequest(equipmentServiceRequest.id)
              );
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
    equipmentServiceRequests,
    rowSelection,
    columns,
    callBack,
  };
};

export default useManageEquipmentServiceRequest;
