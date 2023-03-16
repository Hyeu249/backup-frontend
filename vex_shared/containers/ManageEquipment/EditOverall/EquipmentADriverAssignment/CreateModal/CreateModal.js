import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';

import '@iso/cra/src/index.css';
import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/equipment/service/equipmentADriverAssignment/actions';
import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';

import useRawFields from '../hook/useRawFields.js';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createEquipmentADriverAssignment } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();
  const { id } = useParams();

  //confirm and dispatch create equipmentADriverAssignment action
  function confirmCreateEquipmentADriverAssignmentHandle() {
    const raw = this;
    const equipmentADriverAssignmentData = cloneDeep(raw);
    equipmentADriverAssignmentData.result.equipment_id = id;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.equipmentADriverAssignmentConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.equipmentADriverAssignmentDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(
          createEquipmentADriverAssignment(equipmentADriverAssignmentData)
        );
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={intl.formatMessage({
          id: 'text.createEquipmentADriverAssignment',
        })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateEquipmentADriverAssignmentHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
