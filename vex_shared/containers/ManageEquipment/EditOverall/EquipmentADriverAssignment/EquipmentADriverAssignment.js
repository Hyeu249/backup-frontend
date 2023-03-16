import React from 'react';
import { useIntl } from 'react-intl';
import ReactDom from 'react-dom';

import AttachIcon from '@iso/vex_config/icon/AttachIcon';

import OptionHeader from '@iso/vex_ui/OptionHeader/OptionHeader';
import CustomWrapper from '@iso/vex_lib/wraps/CustomWrapper';
import CreateModal from './CreateModal/CreateModal';

import useEquipmentADriverAssignment from './hook/useEquipmentADriverAssignment';

const EquipmentADriverAssignment = () => {
  const intl = useIntl();
  const {
    //state
    createOpen,
    equipmentADriverAssignment,
    //setState
    setCreateOpen,
    setEquipmentADriverAssignment,
    //others
    equipmentADriverAssignments,
    renderItems,
  } = useEquipmentADriverAssignment();

  return (
    <CustomWrapper>
      <OptionHeader
        title={intl.formatMessage({
          id: 'text.equipmentADriverAssignment',
        })}
        value={equipmentADriverAssignment}
        onSelect={v => setEquipmentADriverAssignment(v)}
        searchOptions={equipmentADriverAssignments}
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.createEquipmentADriverAssignment',
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

export default EquipmentADriverAssignment;

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
