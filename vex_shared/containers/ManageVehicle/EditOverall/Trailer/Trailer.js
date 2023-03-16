import React from 'react';
import { useIntl } from 'react-intl';
import ReactDom from 'react-dom';
import useTrailer from './hook/useTrailer';

import AttachIcon from '@iso/vex_config/icon/AttachIcon';
import OptionHeader from '@iso/vex_ui/OptionHeader/OptionHeader';

import CustomWrapper from '@iso/vex_lib/wraps/CustomWrapper';
import CreateModal from './CreateModal/CreateModal';
import EditModal from './EditModal/EditModal';

const Trailer = () => {
  const intl = useIntl();
  const {
    //state
    createOpen,
    editOpen,
    trailer,
    //setState
    setCreateOpen,
    setEditOpen,
    setTrailer,
    //others
    trailers,
    renderItems,
  } = useTrailer();

  return (
    <CustomWrapper>
      <OptionHeader
        title={intl.formatMessage({
          id: 'text.trailer',
        })}
        value={trailer}
        onSelect={v => setTrailer(v)}
        searchOptions={trailers}
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.createTrailer',
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
      {editOpen &&
        ReactDom.createPortal(
          <EditModal open={editOpen} setOpen={setEditOpen} />,
          document.getElementById('modal-root')
        )}
    </CustomWrapper>
  );
};

export default Trailer;

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
