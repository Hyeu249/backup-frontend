import React from 'react';
import { useIntl } from 'react-intl';
import ReactDom from 'react-dom';
import useImages from './hooks/useImages';

import AttachIcon from '@iso/vex_config/icon/AttachIcon';
import OptionHeader from '@iso/vex_ui/OptionHeader/OptionHeader';

import CustomWrapper from '@iso/vex_lib/wraps/CustomWrapper';
import CreateModal from './CreateModal/CreateModal';

const DriverDocumentImage = () => {
  const intl = useIntl();
  const {
    //state
    createOpen,
    driverDocumentImage,
    //setState
    setCreateOpen,
    setDriverDocumentImage,
    //others
    driverDocumentImages,
    renderItems,
  } = useImages();

  return (
    <CustomWrapper>
      <OptionHeader
        title={intl.formatMessage({
          id: 'text.imagesForDriverDocument',
        })}
        value={driverDocumentImage}
        onSelect={v => setDriverDocumentImage(v)}
        searchOptions={driverDocumentImages}
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.createImages',
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

export default DriverDocumentImage;

function List({ children }) {
  return (
    <div
      style={{
        padding: '0 15px',
        backgroundColor: '#ffffff',
      }}
    >
      {children}
    </div>
  );
}
