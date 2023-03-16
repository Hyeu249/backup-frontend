import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Link, useRouteMatch } from 'react-router-dom';

import message from '@iso/components/uielements/message';
import { DropdownMenu, MenuItem } from '@iso/components/uielements/dropdown';
import { DeleteIcon } from '@iso/config/icon.config';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import actions from '@iso/vex_redux/fuelRequest/service/fuelRequest/actions';
import ThreeDotIcon from '@iso/vex_config/icon/ThreeDotIcon';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';

const useFuelRequest = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const { initData, removeInitData, deleteFuelRequest, approveFuelRequest } =
    actions;

  const fuelRequests = useSelector(state => state.fuelRequest.fuelRequests);
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
          setSelected(fuelRequests.map(fuelRequests => fuelRequests.key)),
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
        .formatMessage({ id: 'text.fuelRequestVolumeLiter' })
        ?.split('(')[0],
      dataIndex: 'volume_liter',
      rowKey: 'volume_liter',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.fuelRequestFuelDate' })
        ?.split('(')[0],
      dataIndex: 'refuel_date',
      rowKey: 'refuel_date',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '10%',
      render: (text, fuelRequest) => (
        <div className="isoBtnView">
          {/* view button */}
          <Link to={`${match.path}/${fuelRequest.id}`}>
            <Button color="primary" className="ViewBtn">
              <IntlMessages id="text.view" />
            </Button>
          </Link>
          {/* delete button */}
          <Button
            className="DltBtn"
            onClick={() => {
              console.log('deleted fuelRequest_id: ', fuelRequest.id);
              dispatch(deleteFuelRequest(fuelRequest.id));
            }}
          >
            <DeleteIcon size={18} />
          </Button>
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'approve',
      rowKey: 'approve',
      width: '10%',
      render: (text, fuelRequest) => (
        <div className="isoBtnView">
          {/* view button */}
          {/* <Button
            color="primary"
            className="ViewBtn"
            onClick={() => {
              dispatch(
                approveFuelRequest({
                  id: fuelRequest.id,
                  is_approved: true,
                })
              );
              console.log('duyet', fuelRequest.id);
            }}
          >
            <IntlMessages id="text.approve" />
          </Button> */}
          <CustomDropDown
            menu={[
              {
                title: intl.formatMessage({
                  id: 'text.approve',
                }),
                value: fuelRequest.id,
                onClick: e =>
                  dispatch(
                    approveFuelRequest({
                      id: e,
                      is_approved: true,
                    })
                  ),
                Icon: <></>,
              },
              {
                title: intl.formatMessage({
                  id: 'text.reject',
                }),
                value: fuelRequest.id,
                onClick: e =>
                  dispatch(
                    approveFuelRequest({
                      id: e,
                      is_approved: false,
                    })
                  ),
                Icon: <></>,
              },
            ]}
          >
            <Button>
              <ThreeDotIcon />
            </Button>
          </CustomDropDown>
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
    fuelRequests,
    rowSelection,
    columns,
    callBack,
  };
};

export default useFuelRequest;
