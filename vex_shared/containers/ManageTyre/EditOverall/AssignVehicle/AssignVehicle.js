import React from 'react';
import { useIntl } from 'react-intl';
import ReactDom from 'react-dom';
import useAssignment from './hook/useAssignment';

import AttachIcon from '@iso/vex_config/icon/AttachIcon';
import OptionHeader from '@iso/vex_ui/OptionHeader/OptionHeader';

import CustomWrapper from '@iso/vex_lib/wraps/CustomWrapper';
import CreateModal from './CreateModal/CreateModal';
import EditModal from './EditModal/EditModal';

const AssignVehicle = () => {
  const intl = useIntl();
  const {
    //state
    createOpen,
    editOpen,
    assignment,
    //setState
    setCreateOpen,
    setEditOpen,
    setAssignment,
    //others
    assignments,
    renderItems,
  } = useAssignment();

  return (
    <CustomWrapper>
      <OptionHeader
        title={intl.formatMessage({
          id: 'text.assignToVehicle',
        })}
        value={assignment}
        onSelect={v => setAssignment(v)}
        searchOptions={assignments}
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.createAssignTyreToVehicle',
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

export default AssignVehicle;

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
