import React from 'react';
import ReactDoom from 'react-dom';
import { useSelector } from 'react-redux';

import CardWrapper, { Box } from '@iso/vex_ui/wraps/CardWrapper.styles';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Button from '@iso/components/uielements/button';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { AddIcon } from '@iso/config/icon.config';
import { DropdownButtons } from '@iso/components/uielements/dropdown';

import useManageContract from './hook/useManageContract';
import CreateModal from './CreateModal/CreateModal';

export default function ManageContract() {
  const {
    createOpen,
    setCreateOpen,
    contracts,
    rowSelection,
    columns,
    callBack,
  } = useManageContract();
  const { handleButtonClick, dropdownMenu } = callBack();
  const DropdownButton = DropdownButtons;

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.contract" />
      </PageHeader>
      <Box>
        <div
          className="isoTableBtn"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <DropdownButton onClick={handleButtonClick} overlay={dropdownMenu()}>
            <IntlMessages id="ui.dropdown.option" />
          </DropdownButton>
          <Button
            type="primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--button-color)',
              paddingRight: '10px',
              paddingLeft: '5px',
            }}
            onClick={() => setCreateOpen(true)}
          >
            <AddIcon style={{ fontSize: '20px', paddingRight: '3px' }} />
            <span style={{ lineHeight: '200' }}>
              <IntlMessages id="sidebar.addContract" />
            </span>
          </Button>
        </div>

        <CardWrapper title="Contract">
          {contracts?.length === 0 ? (
            <HelperText text="No Contracts" />
          ) : (
            <div className="isoTable">
              <Scrollbars
                style={{ width: '100%', height: 'calc(100vh - 70px)' }}
              >
                <TableWrapper
                  rowSelection={rowSelection}
                  dataSource={contracts}
                  columns={columns}
                  pagination={false}
                  className="ListTable"
                />
              </Scrollbars>
            </div>
          )}
        </CardWrapper>
      </Box>

      {createOpen &&
        ReactDoom.createPortal(
          <CreateModal open={createOpen} setOpen={setCreateOpen} />,
          document.getElementById('modal-root')
        )}
    </LayoutWrapper>
  );
}
