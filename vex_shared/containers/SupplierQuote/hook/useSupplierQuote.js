import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Link, useRouteMatch } from 'react-router-dom';

import message from '@iso/components/uielements/message';
import { DropdownMenu, MenuItem } from '@iso/components/uielements/dropdown';
import { DeleteIcon } from '@iso/config/icon.config';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import actions from '@iso/vex_redux/supplierQuote/service/supplierQuote/actions';
import ThreeDotIcon from '@iso/vex_config/icon/ThreeDotIcon';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';

const useManageSupplierQuote = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const {
    initData,
    removeInitData,
    deleteSupplierQuote,
    approveSupplierQuote,
  } = actions;

  const supplierQuotes = useSelector(
    state => state.supplierQuote.supplierQuotes
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
          setSelected(supplierQuotes.map(supplierQuotes => supplierQuotes.key)),
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
        .formatMessage({ id: 'text.supplierQuoteValidFrom' })
        ?.split('(')[0],
      dataIndex: 'valid_from',
      rowKey: 'valid_from',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.supplierQuoteValidUntil' })
        ?.split('(')[0],
      dataIndex: 'valid_until',
      rowKey: 'valid_until',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.supplierQuoteEquipmentPrice' })
        ?.split('(')[0],
      dataIndex: 'equipment_price',
      rowKey: 'equipment_price',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.supplierQuoteLaborCost' })
        ?.split('(')[0],
      dataIndex: 'labor_cost',
      rowKey: 'labor_cost',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '10%',
      render: (text, supplierQuote) => (
        <div className="isoBtnView">
          {/* view button */}
          <Link to={`${match.path}/${supplierQuote.id}`}>
            <Button color="primary" className="ViewBtn">
              <IntlMessages id="text.view" />
            </Button>
          </Link>
          {/* delete button */}
          <Button
            className="DltBtn"
            onClick={() => {
              console.log('deleted supplierQuote_id: ', supplierQuote.id);
              dispatch(deleteSupplierQuote(supplierQuote.id));
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
      render: (text, supplierQuote) => (
        <div className="isoBtnView">
          {/* view button */}
          <CustomDropDown
            menu={[
              {
                title: intl.formatMessage({
                  id: 'text.approve',
                }),
                value: supplierQuote.id,
                onClick: e =>
                  dispatch(
                    approveSupplierQuote({
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
                value: supplierQuote.id,
                onClick: e =>
                  dispatch(
                    approveSupplierQuote({
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
    supplierQuotes,
    rowSelection,
    columns,
    callBack,
  };
};

export default useManageSupplierQuote;
