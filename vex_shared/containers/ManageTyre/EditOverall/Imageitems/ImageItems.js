import React from 'react';
import { useIntl } from 'react-intl';
import ReactDom from 'react-dom';
import useImages from './hooks/useImages';

import AttachIcon from '@iso/vex_config/icon/AttachIcon';
import OptionHeader from '@iso/vex_ui/OptionHeader/OptionHeader';

import CustomWrapper from '@iso/vex_lib/wraps/CustomWrapper';
import CreateModal from './CreateModal/CreateModal';

const AssignVehicle = () => {
  const intl = useIntl();
  const {
    //state
    createOpen,
    tyreImage,
    //setState
    setCreateOpen,
    setTyreImage,
    //others
    tyreImages,
    renderItems,
  } = useImages();

  return (
    <CustomWrapper>
      <OptionHeader
        title={intl.formatMessage({
          id: 'text.imagesForTyre',
        })}
        value={tyreImage}
        onSelect={v => setTyreImage(v)}
        searchOptions={tyreImages}
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

export default AssignVehicle;

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
