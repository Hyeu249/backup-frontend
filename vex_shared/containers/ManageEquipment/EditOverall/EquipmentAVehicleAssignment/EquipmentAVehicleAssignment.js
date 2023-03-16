import React from 'react';
import { useIntl } from 'react-intl';
import ReactDom from 'react-dom';

import AttachIcon from '@iso/vex_config/icon/AttachIcon';

import OptionHeader from '@iso/vex_ui/OptionHeader/OptionHeader';
import CustomWrapper from '@iso/vex_lib/wraps/CustomWrapper';
import CreateModal from './CreateModal/CreateModal';

import useEquipmentAVehicleAssignment from './hook/useEquipmentAVehicleAssignment';

const EquipmentAVehicleAssignment = () => {
  const intl = useIntl();
  const {
    //state
    createOpen,
    equipmentAVehicleAssignment,
    //setState
    setCreateOpen,
    setEquipmentAVehicleAssignment,
    //others
    equipmentAVehicleAssignments,
    renderItems,
  } = useEquipmentAVehicleAssignment();

  return (
    <CustomWrapper>
      <OptionHeader
        title={intl.formatMessage({
          id: 'text.equipmentAVehicleAssignment',
        })}
        value={equipmentAVehicleAssignment}
        onSelect={v => setEquipmentAVehicleAssignment(v)}
        searchOptions={equipmentAVehicleAssignments}
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.createEquipmentAVehicleAssignment',
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

export default EquipmentAVehicleAssignment;

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
