import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import message from '@iso/components/uielements/message';
import { DropdownMenu, MenuItem } from '@iso/components/uielements/dropdown';
import { DeleteIcon } from '@iso/config/icon.config';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import driverDocumentTypeActions from '@iso/vex_redux/driverDocumentType/actions';

const useDriverDocumentType = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { initData, setViewedDriverDocumentType, deleteDriverDocumentType } =
    driverDocumentTypeActions;

  const driverDocumentTypes = useSelector(
    state => state.driverDocumentType.driverDocumentTypes
  );
  const [selected, setSelected] = React.useState([]);

  //state
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  React.useEffect(() => {
    dispatch(initData());
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
            driverDocumentTypes.map(
              driverDocumentTypes => driverDocumentTypes.key
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
        .formatMessage({ id: 'text.nameDriverDocumentType' })
        ?.split('(')[0],
      dataIndex: 'name',
      rowKey: 'name',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.descriptionDriverDocumentType' })
        ?.split('(')[0],
      dataIndex: 'description',
      rowKey: 'description',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: intl
        .formatMessage({ id: 'text.isRequiredDriverDocumentType' })
        ?.split('(')[0],
      dataIndex: 'is_required',
      rowKey: 'is_required',
      width: 'auto',
      render: text => <span>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '10%',
      render: (text, driverDocumentType) => (
        <div className="isoBtnView">
          {/* view button */}
          <Button
            color="primary"
            className="ViewBtn"
            onClick={() => {
              dispatch(setViewedDriverDocumentType(driverDocumentType));
              setEditOpen(true);
            }}
          >
            <IntlMessages id="text.view" />
          </Button>
          {/* delete button */}
          <Button
            className="DltBtn"
            onClick={() => {
              console.log(
                'deleted driverDocumentType_id: ',
                driverDocumentType.id
              );
              dispatch(deleteDriverDocumentType(driverDocumentType.id));
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
    editOpen,
    setEditOpen,
    driverDocumentTypes,
    rowSelection,
    columns,
    callBack,
  };
};

export default useDriverDocumentType;
