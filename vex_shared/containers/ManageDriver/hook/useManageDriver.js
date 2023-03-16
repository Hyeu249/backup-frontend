import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Link, useRouteMatch } from 'react-router-dom';

import message from '@iso/components/uielements/message';
import { DropdownMenu, MenuItem } from '@iso/components/uielements/dropdown';
import { DeleteIcon } from '@iso/config/icon.config';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import actions from '@iso/vex_redux/driver/service/driver/actions';

const useManageDriver = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const { initData, removeInitData, deleteDriver } = actions;

  const drivers = useSelector(state => state.driver.drivers);
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
        onSelect: () => setSelected(drivers.map(drivers => drivers.key)),
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
      title: intl.formatMessage({ id: 'text.firstName' })?.split('(')[0],
      dataIndex: 'first_name',
      rowKey: 'first_name',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'text.lastName' })?.split('(')[0],
      dataIndex: 'last_name',
      rowKey: 'brand',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'text.dateOfBirth' })?.split('(')[0],
      dataIndex: 'date_of_birth',
      rowKey: 'date_of_birth',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'text.CCCD' })?.split('(')[0],
      dataIndex: 'national_id_card_no',
      rowKey: 'national_id_card_no',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'text.taxId' })?.split('(')[0],
      dataIndex: 'tax_id',
      rowKey: 'tax_id',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'page.address' })?.split('(')[0],
      dataIndex: 'address',
      rowKey: 'address',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'page.phone' })?.split('(')[0],
      dataIndex: 'phone',
      rowKey: 'phone',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'page.email' })?.split('(')[0],
      dataIndex: 'email',
      rowKey: 'email',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'text.joinDate' })?.split('(')[0],
      dataIndex: 'join_date',
      rowKey: 'join_date',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'text.exitDate' })?.split('(')[0],
      dataIndex: 'exit_date',
      rowKey: 'exit_date',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '10%',
      render: (text, driver) => (
        <div className="isoBtnView">
          {/* view button */}
          <Link to={`${match.path}/${driver.id}`}>
            <Button color="primary" className="ViewBtn">
              <IntlMessages id="text.view" />
            </Button>
          </Link>
          {/* delete button */}
          <Button
            className="DltBtn"
            onClick={() => {
              console.log('deleted driver_id: ', driver.id);
              dispatch(deleteDriver(driver.id));
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
    drivers,
    rowSelection,
    columns,
    callBack,
  };
};

export default useManageDriver;
