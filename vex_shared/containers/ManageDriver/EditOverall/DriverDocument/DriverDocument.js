import React from 'react';
import { useIntl } from 'react-intl';
import ReactDom from 'react-dom';

import AttachIcon from '@iso/vex_config/icon/AttachIcon';

import OptionHeader from '@iso/vex_ui/OptionHeader/OptionHeader';
import CustomWrapper from '@iso/vex_lib/wraps/CustomWrapper';
import CreateModal from './CreateModal/CreateModal';

import useDriverDocument from './hook/useDriverDocument';

const DriverDocument = () => {
  const intl = useIntl();
  const {
    //state
    createOpen,
    driverDocument,
    //setState
    setCreateOpen,
    setDriverDocument,
    //others
    driverDocuments,
    renderItems,
  } = useDriverDocument();

  return (
    <CustomWrapper>
      <OptionHeader
        title={intl.formatMessage({
          id: 'text.driverDocument',
        })}
        value={driverDocument}
        onSelect={v => setDriverDocument(v)}
        searchOptions={driverDocuments}
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.createDriverDocument',
            }),
            onClick: e => setCreateOpen(true),
            Icon: (
              <AttachIcon style={{ color: '#636f73', marginLeft: '15px' }} />
            ),
          },
        ]}
      />
      <List>{renderItems}</List>
      {createOpen &&
        ReactDom.createPortal(
          <CreateModal open={createOpen} setOpen={setCreateOpen} />,
          document.getElementById('modal-root')
        )}
    </CustomWrapper>
  );
};

export default DriverDocument;

function List({ children }) {
  return (
    <div
      style={{
        padding: '0 15px',
      }}
    >
      {children}
    </div>
  );
}
