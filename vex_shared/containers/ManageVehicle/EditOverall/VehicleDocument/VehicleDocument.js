import React from 'react';
import { useIntl } from 'react-intl';
import ReactDom from 'react-dom';

import AttachIcon from '@iso/vex_config/icon/AttachIcon';

import OptionHeader from '@iso/vex_ui/OptionHeader/OptionHeader';
import CustomWrapper from '@iso/vex_lib/wraps/CustomWrapper';
import CreateModal from './CreateModal/CreateModal';

import useVehicleDocument from './hook/useVehicleDocument';

const VehicleDocument = () => {
  const intl = useIntl();
  const {
    //state
    createOpen,
    vehicleDocument,
    //setState
    setCreateOpen,
    setVehicleDocument,
    //others
    vehicleDocuments,
    renderItems,
  } = useVehicleDocument();

  return (
    <CustomWrapper>
      <OptionHeader
        title={intl.formatMessage({
          id: 'text.vehicleDocument',
        })}
        value={vehicleDocument}
        onSelect={v => setVehicleDocument(v)}
        searchOptions={vehicleDocuments}
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.createVehicleDocument',
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

export default VehicleDocument;

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
